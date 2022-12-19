import styles from "./ToolBar.module.css";
import {PresentationType} from "../../OurTypes";
import {ToolManager} from "../../utils/managers/ToolManager";
import textIcon from "../../images/text.svg"
import imageIcon from "../../images/image.svg"
import figureIcon from "../../images/figure.svg"
import newSlideIcon from "../../images/new_slide.svg"

function ToolBar( content: { presentation: PresentationType, requireUpdate: () => void } ) {
    const currentSlide = (content.presentation.slides.find(slide => { return slide.id === content.presentation.currentSlideId})) || content.presentation.slides[0];

    function UnselectBlocks() {
        currentSlide.blocks.forEach(block => { block.isSelected = false})
    }

    function CreateFigure() {
        UnselectBlocks();

        ToolManager.CreateFigure(currentSlide);

        content.requireUpdate();
    }

    function CreateText() {
        UnselectBlocks();

        ToolManager.CreateText(currentSlide);

        content.requireUpdate();
    }

    function CreateImage() {
        UnselectBlocks();

        ToolManager.CreateImage(currentSlide);

        content.requireUpdate();
    }

    function CreateSlide() {
         ToolManager.CreateSlide(content.presentation);

        content.requireUpdate();
    }

    return (
        <div className={styles.toolBar}>
            <div className={styles.tool} title={"Добавить текст на слайд"} onClick={CreateText}><img src={textIcon} alt={"Text"}/></div>
            <div className={styles.tool} title={"Добавить фигуру на слайд"} onClick={CreateFigure}><img src={figureIcon} alt={"Figure"}/></div>
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <div className={styles.tool} title={"Добавить картинку на слайд"} onClick={CreateImage}><img src={imageIcon} alt={"Image"}/></div>
            <div className={styles.tool} title={"Создать новый слайд"} onClick={CreateSlide}><img src={newSlideIcon} alt={"New slide"}/></div>
        </div>
    );
}

export default ToolBar;