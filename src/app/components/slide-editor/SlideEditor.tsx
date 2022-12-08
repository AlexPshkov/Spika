import styles from "./SlideEditor.module.css";
import {BlockType, SlideType} from "../../OurTypes";
import Picture from "../base-elements/picture/Picture";
import Text from "../base-elements/text/Text";
import Primitive from "../base-elements/primitives/Primitive";

function SlideEditor({id, blocks, background, resolution, selectedBlocks}: SlideType ) {
    const style = {
        backgroundColor: background,
        width: resolution.width,
        height: resolution.height
    }

    function VisualizeBlock( block: BlockType ): any {
        const content = block.content;

        switch (content.type) {
            case "picture":
                return <Picture picture={content}/>
            case "text":
                return <Text text={content}/>
            case "primitive":
                return <Primitive primitive={content}/>
            default:
                return <span>Default span</span>
        }
    }

    return (
        <div className={styles.slideEditor} style={style}>
            {blocks.map(x => VisualizeBlock(x))}
        </div>
    );
}



export default SlideEditor;