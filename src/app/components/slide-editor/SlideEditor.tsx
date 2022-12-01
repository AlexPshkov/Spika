import styles from "./SlideEditor.module.css";
import {BlockType, SlideType} from "../../OurTypes";
import Picture from "../base-elements/picture/Picture";
import Text from "../base-elements/text/Text";

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
                return <Picture width={content.width}
                                height={content.height}
                                url={content.url}
                                type={content.type}
                                position={content.position}/>
            case "text":
                return <Text type={content.type}
                             fontFamily={content.fontFamily}
                             fontColor={content.fontColor}
                             fontSize={content.fontSize}
                             height={content.height}
                             width={content.width}
                             symbols={content.symbols}
                             position={content.position} />
            case "primitive":
                return <span>Primitive</span>
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