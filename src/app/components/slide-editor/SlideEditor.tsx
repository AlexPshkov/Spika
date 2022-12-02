import styles from "./SlideEditor.module.css";
import {BlockType, SlideType} from "../../OurTypes";
import Picture from "../base-elements/picture/Picture";
import Text from "../base-elements/text/Text";
import Triangle from "../base-elements/primitives/figures/Triangle";
import Rectangle from "../base-elements/primitives/figures/Rectangle";
import Ellipse from "../base-elements/primitives/figures/Ellipse";

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
                switch (content.content.type) {
                    case "triangle":
                        return <Triangle type={content.type}
                                         content={content.content}
                                         width={content.width}
                                         height={content.height}
                                         backgroundColor={content.backgroundColor}
                                         borderColor={content.borderColor}
                                         borderSize={content.borderSize}
                                         position={content.position} />
                    case "rectangle":
                        return <Rectangle type={content.type}
                                          content={content.content}
                                          width={content.width}
                                          height={content.height}
                                          backgroundColor={content.backgroundColor}
                                          borderColor={content.borderColor}
                                          borderSize={content.borderSize}
                                          position={content.position} />
                    case "ellipse":
                        return <Ellipse type={content.type}
                                        content={content.content}
                                        width={content.width}
                                        height={content.height}
                                        backgroundColor={content.backgroundColor}
                                        borderColor={content.borderColor}
                                        borderSize={content.borderSize}
                                        position={content.position} />
                    default:
                        return <span>Default span</span>
                }
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