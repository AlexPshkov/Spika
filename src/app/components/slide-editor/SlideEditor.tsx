import styles from "./SlideEditor.module.css";
import {BlockType, SlideType} from "../../OurTypes";
import Picture from "../base-elements/picture/Picture";
import Text from "../base-elements/text/Text";
import Primitive from "../base-elements/primitives/Primitive";
import MovableElement from "../special-elements/movable-element/MovableElement";
import {useState} from "react";
import ResizeableElement from "../special-elements/resizeable-element/ResizeableElement";
import SelectableElement from "../special-elements/selectable-element/SelectableElement";

function SlideEditor(content: { slide: SlideType, updateSlide: (slide: SlideType) => void } ) {
    const [slide, setSlide] = useState(content.slide);

    let style = {
        backgroundColor: slide.background,
        width: slide.resolution.width,
        height: slide.resolution.height
    }

    function UpdateElementPosition(block: BlockType, x: number, y: number) {
        block.content.position.point.x = x;
        block.content.position.point.y = y;

        setSlide({...content.slide});
    }

    function UpdateElementSelect(block: BlockType, isSelected: boolean) {
        block.isSelected = isSelected;

        setSlide({...content.slide});
    }

    function UpdateElementTransform(block: BlockType, angle: number, width: number, height: number ) {
        block.content.position.angle.degrees = angle;
        block.content.width = width;
        block.content.height = height;

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
        const simpleElement: any = GetBlock(blockType);

        const selectableElement: any = <SelectableElement element={simpleElement}
                                                          elementContext={blockType}
                                                          selectUpdateFunc={(isSelected) => UpdateElementSelect(blockType, isSelected)}/>
        const resizeableElement: any = <ResizeableElement element={selectableElement}
                                                          elementContext={blockType.content}
                                                          transformUpdateFunc={(angle, width, height) => UpdateElementTransform(blockType, angle, width, height)}/>
        const movableElement: any = <MovableElement element={resizeableElement}
                                                     elementPosition={blockType.content.position}
                                                     positionUpdateFunc={(x, y) => UpdateElementPosition(blockType, x, y)}/>;
        return movableElement;
    }

    return (
        <div className={styles.slideEditor} style={style}>
            {slide.blocks.map(x => VisualizeBlock(x))}
        </div>
    );
}



export default SlideEditor;