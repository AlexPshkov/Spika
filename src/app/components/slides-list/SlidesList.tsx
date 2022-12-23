import {BlockType, PresentationType, SlideType} from "../../OurTypes";
import styles from "./SlidesList.module.css";
import React from "react";
import Picture from "../base-elements/picture/Picture";
import Primitive from "../base-elements/primitives/Primitive";
import Text from "../base-elements/text/Text";


function SlidesList( content: { presentation: PresentationType, updateFunc: (presentation: PresentationType) => void}) {
    const maxHeight = 145;
    function onMouseDownHandler(mouseEvent: React.MouseEvent<HTMLDivElement>, slide: SlideType) {
        if (mouseEvent.shiftKey) {
            slide.isSelected = !slide.isSelected;
        } else {
            content.presentation.currentSlideId = slide.id;
            let currentSlide = content.presentation.slides[content.presentation.slides.indexOf(slide)];
            currentSlide.blocks.forEach(block => {
                if (block.isSelected) block.isSelected = false
            })
        }
        content.updateFunc({...content.presentation});
    }

    function visualizeBlock( blockType: BlockType ): any {
        const content = blockType.content;
        let block: any;
        const style: React.CSSProperties = {
            position: "absolute",
            width: content.width,
            height: content.height,
            transform: `rotate(${content.position.angle}deg)`,
            left: content.position.x,
            top: content.position.y
        }

        switch (content.type) {
            case "picture":
                block = <Picture picture={content}/>;
                break;
            case "text":
                block = <Text text={content}/>;
                break;
            case "primitive":
                block = <Primitive primitive={content}/>;
                break;
            default:
                block = <span>Default span</span>;
        }

        return(
            <div style={style}>
                {block}
            </div>
        )
    }

    function visualizeSlide( slide: SlideType ) {
        const style: React.CSSProperties = {
            background: slide.background,
            width: slide.resolution.width,
            height: slide.resolution.height,
            // aspectRatio: slide.resolution.width + " / " + slide.resolution.height,
            zoom: maxHeight/slide.resolution.height,
            position: "relative",
            overflow: "hidden",
            userSelect: "none",
            flexShrink: 0
        }

        return <div className={(slide.isSelected ? styles.selectedSlide : (content.presentation.currentSlideId === slide.id ? styles.currentSlide : ""))}
                    style={style}
                    onMouseDown={(event) => onMouseDownHandler(event, slide)}>
            {slide.blocks.map(x => visualizeBlock(x))}
        </div>
    }

    return (
        <div className={styles.slidesList}>
            {content.presentation.slides.map(x => visualizeSlide(x))}
        </div>
    )
}

export default SlidesList