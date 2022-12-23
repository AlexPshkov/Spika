import styles from "./SlideEditor.module.css";
import {BlockType, SlideType} from "../../OurTypes";
import Picture from "../base-elements/picture/Picture";
import Text from "../base-elements/text/Text";
import Primitive from "../base-elements/primitives/Primitive";
import MovableElement from "../special-elements/movable-element/MovableElement";
import ResizeableElement from "../special-elements/resizeable-element/ResizeableElement";
import SelectableElement from "../special-elements/selectable-element/SelectableElement";

function SlideEditor(content: { slide: SlideType, updatePresentation: () => void } ) {
    const slide = content.slide;

    let style = {
        background: slide.background,
        width: slide.resolution.width,
        height: slide.resolution.height
    }

    function updateElementPosition(block: BlockType, x: number, y: number) {
        block.content.position.x = x;
        block.content.position.y = y;

        content.updatePresentation();
    }

    function updateElementSelect(block: BlockType, isSelected: boolean) {
        block.isSelected = isSelected;

        content.updatePresentation();
    }

    function updateElementTransform(block: BlockType, angle: number, width: number, height: number ) {
        block.content.position.angle = angle;
        block.content.width = width;
        block.content.height = height;

        content.updatePresentation();
    }


    function getBlock( blockType: BlockType ): any {
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

    function visualizeBlock( blockType: BlockType ): any {
        const simpleElement: any = getBlock(blockType);

        const selectableElement: any = <SelectableElement element={simpleElement}
                                                          elementContext={blockType}
                                                          selectUpdateFunc={(isSelected) => updateElementSelect(blockType, isSelected)}/>
        const movableElement: any = <MovableElement element={selectableElement}
                                                    elementPosition={blockType.content.position}
                                                    positionUpdateFunc={(x, y) => updateElementPosition(blockType, x, y)}/>;
        const resizeableElement: any = <ResizeableElement element={movableElement}
                                                          elementContext={blockType}
                                                          transformUpdateFunc={(angle, width, height) => updateElementTransform(blockType, angle, width, height)}
                                                          positionUpdateFunc={(x, y) => updateElementPosition(blockType, x, y)}/>

        return resizeableElement;
    }

    return (
        <div className={styles.slideEditor} style={style} >
            {slide.blocks.map(x => visualizeBlock(x))}
        </div>
    );
}



export default SlideEditor;