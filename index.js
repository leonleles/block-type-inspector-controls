import {registerBlockType} from '@wordpress/blocks';
import {__} from '@wordpress/i18n';
import '@wordpress/block-editor';

const {InspectorControls} = wp.blockEditor;
const {PanelBody, PanelRow, SelectControl} = wp.components;

import ShimmerEffect from "../../components/ShimmerEffect";
import BlockEditorContainer from "../../components/BlockEditorContainer";
import ShimmerEffectLine from "../../components/ShimmerEffectLine";

registerBlockType('create-block/block-type-name', {
    title: __('Block type example'),
    description: __('My description'),
    category: "widgets",
    icon: {
        src: 'id-alt',
        foreground: '#4EC47A',
    },
    example: {},
    attributes: {
        // TODO pre define field
        postType: {
            type: 'string',
            default: 'page'
        }
    },

    edit({attributes, setAttributes}) {

        if (wp.data.select('core/editor').didPostSaveRequestSucceed()) {
            setAttributes({postid: wp.data.select('core/editor').getCurrentPostId()});
        }

        // TODO Array values from field select
        let postTypes = '';
        if (wp.data.select('core').getPostTypes() != undefined) {
            postTypes = wp.data.select('core').getPostTypes().map((v) => ({
                value: v.slug,
                label: v.labels.name
            }));
        }

        return (
            <>
              // TODO insert control in configs editor
                <InspectorControls>
                    <PanelBody
                        title="Configurações"
                        initialOpen={true}
                        onChange={(newval) => setAttributes({toggle: newval})}
                    >
                        <PanelRow>
                            <SelectControl
                                label="Tipo do Post"
                                value={attributes.postType}
                                options={postTypes}
                                onChange={(newPostType) => {
                                    setAttributes({postType: newPostType})
                                }}
                            />
                        </PanelRow>
                    </PanelBody>
                </InspectorControls>
            </>
        );
    },
    save() {
        return null;
    }
});
