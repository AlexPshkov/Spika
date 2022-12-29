import styles from "./ToolBar.module.css";
import {BlockType, PresentationType, SlideType} from "../../OurTypes";
import textIcon from "../../images/text.svg"
import imageIcon from "../../images/image.svg"
import figureIcon from "../../images/figure.svg"
import deleteBlocksIcon from "../../images/delete_block.svg"

function ToolBar( content: { presentation: PresentationType, requireUpdate: () => void } ) {
    const currentSlide = content.presentation.slides.find(slide => { return slide.id === content.presentation.currentSlideId});

    function GetMaxId( elements: BlockType[] | SlideType[] | undefined ) {
        let MaxId = -1;
        if (elements) {
            elements.forEach(x => {
                if (x.id > MaxId) MaxId = x.id
            })
        }

        return MaxId
    }

    function UnselectBlocks() {
        currentSlide?.blocks.forEach(block => { block.isSelected = false})
    }

    function CreateFigure() {
        UnselectBlocks();

        const Block: BlockType = {
            id: GetMaxId( currentSlide?.blocks ) + 1,
            isSelected: true,
            content: {
                type: "primitive",
                style: "rectangle",
                width: 50,
                height: 50,
                backgroundColor: "white",
                borderColor: "black",
                borderSize: 2,
                position: {
                    x: 50,
                    y: 50,
                    angle: 0
                }
            }
        }
        currentSlide?.blocks.push(Block)

        content.requireUpdate();
    }

    function CreateText() {
        UnselectBlocks();

        const Block: BlockType = {
            id: GetMaxId( currentSlide?.blocks ) + 1,
            isSelected: true,
            content: {
                type: "text",
                symbols: "Text here",
                width: 100,
                height: 100,
                fontFamily: "",
                fontColor: "black",
                fontSize: 14,
                position: {
                    x: 50,
                    y: 50,
                    angle: 0
                }
            }
        }
        currentSlide?.blocks.push(Block)

        content.requireUpdate();
    }

    function CreateImage() {
        UnselectBlocks();

        const Block: BlockType = {
            id: GetMaxId( currentSlide?.blocks ) + 1,
            isSelected: true,
            content: {
                type: "picture",
                url: "https://demotivation.ru/wp-content/uploads/2021/06/5-27.jpg",
                width: 100,
                height: 100,
                position: {
                    x: 50,
                    y: 50,
                    angle: 0
                }
            }
        }
        currentSlide?.blocks.push(Block)

        content.requireUpdate();
    }


    function DeleteBlocks() {
        currentSlide?.blocks.forEach(block => {
            if (block.isSelected) {
                currentSlide.blocks = currentSlide.blocks.filter(elem => elem.id !== block.id)
            }
        });

        content.requireUpdate();
    }

    return (
        <div className={styles.toolBar}>
            <div className={styles.tool} title={"Добавить текст на слайд"} onClick={CreateText}><img src={textIcon} alt={"Text"}/></div>
            <div className={styles.tool} title={"Добавить фигуру на слайд"} onClick={CreateFigure}><img src={figureIcon} alt={"Figure"}/></div>
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <div className={styles.tool} title={"Добавить картинку на слайд"} onClick={CreateImage}><img src={imageIcon} alt={"Image"}/></div>
            <div className={styles.tool} title={"Удалить выбранные элементы слайда"} onClick={DeleteBlocks}><img src={deleteBlocksIcon} alt={"Delete Blocks"}/></div>
        </div>
    );
}

export default ToolBar;