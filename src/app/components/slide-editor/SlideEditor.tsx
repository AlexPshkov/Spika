import styles from "./SlideEditor.module.css";
import {BlockType, SlideType} from "../../OurTypes";
import Picture from "../base-elements/picture/Picture";
import Text from "../base-elements/text/Text";
import Primitive from "../base-elements/primitives/Primitive";
import MovableElement from "../special-elements/MovableElement";
import {useState} from "react";

function SlideEditor(content: { slide: SlideType, updateSlide: (slide: SlideType) => void } ) {
    const [slide, setSlide] = useState(content.slide);

    let style = {
        backgroundColor: slide.background,
        width: slide.resolution.width,
        height: slide.resolution.height
    }

    function UpdateElementPosition(block: BlockType, x: number, y: number) {
        if (!block) return;

        block.content.position.point.x = x;
        block.content.position.point.y = y;

        setSlide({...content.slide});
    }



    function GetBlock( blockType: BlockType ): any {
        const content = blockType.content;

        switch (content.type) {
            case "picture":
                return <Picture picture={content} />;
            case "text":
                return <Text text={content}/>
            case "primitive":
                return <Primitive primitive={content}/>
            default:
                return <span>Default span</span>
        }
    }

    function VisualizeBlock( blockType: BlockType ): any {
        const blockHtml: any = <MovableElement element={GetBlock(blockType)}
                                               elementPosition={blockType.content.position}
                                               positionUpdateFunc={(x, y) => UpdateElementPosition(blockType, x, y)}></MovableElement>
        return <div className={blockType.isSelected ? styles.selectedElement : ""}>{blockHtml}</div>
    }

    return (
        <div className={styles.slideEditor} style={style}>
            {slide.blocks.map(x => VisualizeBlock(x))}
        </div>
    );
}



export default SlideEditor;