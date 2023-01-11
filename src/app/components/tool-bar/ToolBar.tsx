import styles from "./ToolBar.module.css";
import {BlockType, PresentationType, SlideType} from "../../OurTypes";
import {ReactComponent as textIcon} from "../../images/text.svg"
import {ReactComponent as imageIcon} from "../../images/image.svg"
import {ReactComponent as figureIcon} from "../../images/figure.svg"
import {ReactComponent as deleteBlocksIcon} from "../../images/delete_block.svg"
import {SvgIcon} from "@mui/material";

function ToolBar( content: { presentation: PresentationType, requireUpdate: ( saveState: boolean ) => void } ) {
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
                backgroundColor: "rgb(255,255,255, 1)",
                borderColor: "rgba(0, 0, 0, 1)",
                borderSize: 2,
                position: {
                    x: 50,
                    y: 50,
                    angle: 0
                }
            }
        }
        currentSlide?.blocks.push(Block)

        content.requireUpdate( true );
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
                fontColor: "rgba(0, 0, 0, 1)",
                fontSize: 14,
                position: {
                    x: 50,
                    y: 50,
                    angle: 0
                }
            }
        }
        currentSlide?.blocks.push(Block)

        content.requireUpdate( true );
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

        content.requireUpdate( true );
    }


    function DeleteBlocks() {
        currentSlide?.blocks.forEach(block => {
            if (block.isSelected) {
                currentSlide.blocks = currentSlide.blocks.filter(elem => elem.id !== block.id)
            }
        });

        content.requireUpdate( true );
    }

    return (
        <div className={styles.toolBar}>
            <div className={styles.tool} title={"Добавить текст на слайд"} onClick={CreateText}><SvgIcon component={textIcon} inheritViewBox={true}/></div>
            <div className={styles.tool} title={"Добавить фигуру на слайд"} onClick={CreateFigure}><SvgIcon component={figureIcon} inheritViewBox={true}/></div>
            <div className={styles.tool} title={"Добавить картинку на слайд"} onClick={CreateImage}><SvgIcon component={imageIcon} inheritViewBox={true}/></div>
            <div className={styles.tool} title={"Удалить выбранные элементы слайда"} onClick={DeleteBlocks}><SvgIcon component={deleteBlocksIcon} inheritViewBox={true}/></div>
        </div>
    );
}

export default ToolBar;