import styles from "./ToolBar.module.css";
import {PresentationType, SlideType} from "../../OurTypes";
import {ToolManager} from "../../utils/managers/ToolManager";
import {useState} from "react";

function ToolBar( content: { presentation: PresentationType, requireUpdate: (presentation: PresentationType) => void } ) {
    const currentSlide = (content.presentation.slides.find(slide => { return slide.id === content.presentation.currentSlideId})) || content.presentation.slides[1];

    function UnselectBlocks() {
        currentSlide.blocks.forEach(block => { block.isSelected = false})
    }

    function CreateFigure() {
        UnselectBlocks();

        ToolManager.CreateFigure(currentSlide);

        content.requireUpdate({...content.presentation});
    }

    function CreateText() {
        UnselectBlocks();

        ToolManager.CreateText(currentSlide);

        content.requireUpdate({...content.presentation});
    }

    function CreateImage() {
        UnselectBlocks();

        ToolManager.CreateImage(currentSlide);

        content.requireUpdate({...content.presentation});
    }

    return (
        <div className={styles.toolBar}>
            <div className={styles.tool} title={"Добавить текст на слайд"} onClick={CreateText}><img src={""} alt={"Text"}/></div>
            <div className={styles.tool} title={"Добавить фигуру на слайд"} onClick={CreateFigure}><img src={""} alt={"Figure"}/></div>
            <div className={styles.tool} title={"Добавить картинку на слайд"} onClick={CreateImage}><img src={""} alt={"Image"}/></div>
            <div className={styles.tool} title={"Создать новый слайд"}><img src={""} alt={"New slide"}/></div>
            <div className={styles.tool} title={"Сохранить или экспортировать презентацию"}><img src={""} alt={"Save/Export"}/></div>
        </div>
    );
}

export default ToolBar;