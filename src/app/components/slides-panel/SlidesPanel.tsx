import {BlockType, PresentationType, SlideType} from "../../OurTypes";
import styles from "./SlidesPanel.module.css";
import React from "react";
import Picture from "../base-elements/picture/Picture";
import Primitive from "../base-elements/primitives/Primitive";
import Text from "../base-elements/text/Text";
import {ReactComponent as newSlideIcon} from "../../images/new_slide.svg";
import {ReactComponent as deleteSlideIcon} from "../../images/delete_slide.svg";
import {SvgIcon} from "@mui/material";


function SlidesPanel( content: { presentation: PresentationType, updateFunc: ( saveState: boolean ) => void}) {
    const maxHeight = 145;
    const currentSlide = content.presentation.slides.find(slide => slide.id === content.presentation.currentSlideId)

    function onMouseDownHandler(mouseEvent: React.MouseEvent<HTMLDivElement>, slide: SlideType) {
        if (mouseEvent.shiftKey) {
            slide.isSelected = !slide.isSelected;
        } else {
            content.presentation.currentSlideId = currentSlide?.id === slide.id ? -1 : slide.id;
            UnselectBlocks()
            UnselectSlides()
        }
        content.updateFunc( false );
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
        const style = {
            background: slide.background,
            width: slide.resolution.width,
            height: slide.resolution.height,
            zoom: maxHeight/slide.resolution.height,
        }

        return <div id={`slide_${slide.id}`} className={styles.slide + " " + (slide.isSelected ? styles.selectedSlide : (content.presentation.currentSlideId === slide.id ? styles.currentSlide : ""))}
                    style={style}
                    onMouseDown={(event) => onMouseDownHandler(event, slide)}>
            {slide.blocks.map(x => visualizeBlock(x))}
        </div>
    }

    function UnselectBlocks() {
        currentSlide?.blocks.forEach(block => block.isSelected = false)
    }

    function UnselectSlides() {
        content.presentation.slides.forEach(slide => slide.isSelected = false)
    }

    function GetMaxId( elements: SlideType[] ) {
        let MaxId = -1;
        elements.forEach(x => {
            if (x.id > MaxId) MaxId = x.id
        })
        return MaxId
    }

    function CreateSlide() {
        const id = GetMaxId(content.presentation.slides) + 1
        const currentSlideIndex = currentSlide ? content.presentation.slides.indexOf(currentSlide) : -1
        const Slide: SlideType = {
            id: id,
            blocks: [],
            background: "white",
            resolution: {
                width: 1280,
                height: 720
            },
            isSelected: false
        }

        content.presentation.slides.splice(currentSlideIndex + 1, 0, Slide)

        UnselectBlocks()
        UnselectSlides()

        content.presentation.currentSlideId = id

        content.updateFunc( true );
    }

    function DeleteSlides() {
        if (content.presentation.slides.find(slide => slide.isSelected)) {
            content.presentation.slides.forEach(slide => {
                if (slide.isSelected) {
                    slide.isSelected = false
                    slide.blocks.concat()
                    content.presentation.slides = content.presentation.slides.filter(elem => elem.id !== slide.id)
                }
            })
        } else {
            content.presentation.slides = content.presentation.slides.filter(elem => elem.id !== currentSlide?.id)
        }


        content.updateFunc( true );
    }

    return (
        <div className={styles.slidesPanel}>
            <div className={styles.tools}>
                <div className={styles.tool} title={"Создать новый слайд"} onClick={CreateSlide}><SvgIcon component={newSlideIcon} inheritViewBox={true}/></div>
                <div className={styles.tool} title={"Удалить выбранные слайды"} onClick={DeleteSlides}><SvgIcon component={deleteSlideIcon} inheritViewBox={true}/></div>
            </div>
            <div className={styles.slidesList}>
                {content.presentation.slides.map(x => visualizeSlide(x))}
            </div>
        </div>
    )
}

export default SlidesPanel