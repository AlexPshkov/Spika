import styles from "./InformationPanel.module.css"
import {BlockType, PresentationType, SlideType} from "../../OurTypes";

function InformationPanel( content: { presentation: PresentationType, requireUpdate: (presentation: PresentationType) => void }) {
    function createSlideProperties(): any {
        const selectedSlides: SlideType[] = [];
        let slidesProperties: any = <></>;

        content.presentation.slides.forEach(slide => {
            if ( slide.isSelected ) selectedSlides.push(slide)
        });

        if (selectedSlides.length) {
            slidesProperties = (
                <div className={styles.propertiesContainer}>
                    <div className={styles.propertiesTitle}>Свойства слайдов</div>
                    <div className={styles.properties}>
                        <div>Размер: {(selectedSlides.length === 1) ? selectedSlides[0].resolution.width + " " + selectedSlides[0].resolution.height : ""}</div>
                        <div>Фон: {(selectedSlides.length === 1) ? selectedSlides[0].background : ""}</div>
                    </div>
                </div>
            )
        }
        return {...slidesProperties}
    }

    function createBlockProperties(): any {
        const currentSlide = (content.presentation.slides.find(slide => {
            return slide.id === content.presentation.currentSlideId
        })) || content.presentation.slides[0];
        const selectedBlocks: BlockType[] = [];
        let blocksProperties: any = <></>;

        currentSlide.blocks.forEach( block => {
            if ( block.isSelected ) selectedBlocks.push(block)
        });

        let blockProps: any = <></>;

        if (selectedBlocks.length) {
            const blockStyle = getBlockStyle(selectedBlocks);

            if (blockStyle !== "universal") {
                switch (selectedBlocks[0].content.type) {
                    case "text":
                        blockProps = (
                            <>
                                <div>Содержание: {(selectedBlocks.length === 1) ? selectedBlocks[0].content.symbols : ""}</div>
                                <div>Шрифт: {(selectedBlocks.length === 1) ? selectedBlocks[0].content.fontFamily : ""}</div>
                                <div>Размер шрифта: {(selectedBlocks.length === 1) ? selectedBlocks[0].content.fontSize : ""}</div>
                                <div>Цвет шрифта: {(selectedBlocks.length === 1) ? selectedBlocks[0].content.fontColor : ""}</div>
                            </>
                        );
                        break;
                    case "picture":
                        blockProps = (
                            <>
                                <div>Путь: {(selectedBlocks.length === 1) ? selectedBlocks[0].content.url : ""}</div>
                            </>
                        )
                        break;
                    case "primitive":
                        blockProps = (
                            <>
                                <div>Тип фигуры: {(selectedBlocks.length === 1) ? selectedBlocks[0].content.style : ""}</div>
                                <div>Цвет фигуры: {(selectedBlocks.length === 1) ? selectedBlocks[0].content.backgroundColor : ""}</div>
                                <div>Размер обводки: {(selectedBlocks.length === 1) ? selectedBlocks[0].content.borderSize : ""}</div>
                                <div>Цвет обводки: {(selectedBlocks.length === 1) ? selectedBlocks[0].content.borderColor : ""}</div>
                            </>
                        )
                        break;
                }
            }

            blocksProperties = (
            <div className={styles.propertiesContainer}>
                <div className={styles.propertiesTitle}>Свойства блоков</div>
                <div className={styles.properties}>
                    <div>Позиция: {(selectedBlocks.length === 1) ? selectedBlocks[0].content.position.x + " " + selectedBlocks[0].content.position.y : ""}</div>
                    <div>Ширина: {(selectedBlocks.length === 1) ? selectedBlocks[0].content.width : ""}</div>
                    <div>Высота: {(selectedBlocks.length === 1) ? selectedBlocks[0].content.height : ""}</div>
                    <div>Поворот: {(selectedBlocks.length === 1) ? selectedBlocks[0].content.position.angle : ""}</div>
                    {blockProps}
                </div>
            </div>)
        }
        return {...blocksProperties};
    }

    function getBlockStyle( blocks: BlockType[] ) {
        const selectedBlocksTypes: string[] = [];

        blocks.forEach( block => {
            selectedBlocksTypes.push(block.content.type)
        });

        let similarBlocks = true;

        selectedBlocksTypes.forEach(blockType => {
            if (selectedBlocksTypes[0] !== blockType) return similarBlocks = false
        });

        if (similarBlocks) return selectedBlocksTypes[0];

        return "universal"
    }

    return (<div className={styles.informationPanel}>
        {createBlockProperties()}
        {createSlideProperties()}
    </div>)
}

export default InformationPanel;