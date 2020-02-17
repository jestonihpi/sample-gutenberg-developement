/**
 * BLOCK: sample-embed
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import "./editor.scss";
import "./style.scss";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType("cgb/block-sample-embed", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("Embed Demo - Test "), // Block title.
	icon: "share", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__("sample-embed"), __("CGB Example"), __("create-guten-block")],
	attributes: {
		link: { type: "string" },
		title: { type: "string", default: "Frame title here" },
		showTitle: { type: "boolean", default: false }
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: props => {
		function updateFrameURL(event) {
			props.setAttributes({ link: event.target.value });
		}
		function updateAllowTitle(event) {
			props.setAttributes({ showTitle: event.target.value });
		}
		function updateFrameTitle(event) {
			props.setAttributes({ title: event.target.value });
		}
		function checkIfAllowedTitle() {
			if (props.attributes.showTitle) {
				return null;
			} else {
				return "disabled";
			}
		}
		let showTitle = props.attributes.showTitle;
		// Creates a <p class='wp-block-cgb-block-sample-embed'></p>.
		return (
			<div class="wp-block-cgb-block-sample-embed">
				<div>
					<div class="label">Title:</div>
					<div class="input">
						<input
							type="text"
							onChange={updateFrameTitle}
							value={props.attributes.title}
						/>
					</div>
					<span class="small">(empty to hide)</span>
				</div>
				<div>
					<div class="label">URL</div>
					<div class="input">
						<input
							type="url"
							onChange={updateFrameURL}
							value={props.attributes.link}
						/>
					</div>
				</div>
				<div>
					<div class="label">Height:</div>
					<div class="input">
						<input type="text" class="measurements"></input>%
					</div>
				</div>
				<div>
					<div class="label">Width:</div>
					<div class="input">
						<input type="text" class="measurements"></input>%
					</div>
				</div>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */

	save: props => {
		return (
			<div>
				<h5>{props.attributes.title}</h5>
				<iframe src={props.attributes.link}></iframe>
			</div>
		);
	}
});
