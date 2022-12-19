import styles from "./InformationPanel.module.css"
import {BlockType, PresentationType, SlideType} from "../../OurTypes";
import ChangePropertiesField from "../special-elements/change-properties-field/ChangePropertiesField";
import ChangePropertiesButton from "../special-elements/change-properties-button/ChangePropertiesButton";

function InformationPanel( content: { presentation: PresentationType, requireUpdate: () => void }) {
    const currentSlide = (content.presentation.slides.find(slide => {
        return slide.id === content.presentation.currentSlideId
    })) || content.presentation.slides[0];
    const selectedBlocks: BlockType[] = [];

    currentSlide.blocks.forEach( block => {
        if ( block.isSelected ) selectedBlocks.push(block)
    });

    function createSlideProperties(): any {
        const selectedSlides: SlideType[] = [];
        let slidesProperties: any = <></>;

        content.presentation.slides.forEach(slide => {
            if ( slide.isSelected ) selectedSlides.push(slide)
        });

        if (selectedSlides.length) {
            slidesProperties = (
                <div className={styles.propertiesContainer}>
                    <div className={styles.propertiesTitle}>{(selectedSlides.length === 1) ? "Свойства слайда" : "Свойства слайдов"}</div>
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
        let blocksProperties: any = <></>;
        let blockProps: any = <></>;

        if (selectedBlocks.length) {
            const blockStyle = getBlockStyle(selectedBlocks);

            if (blockStyle !== "universal") {
                switch (selectedBlocks[0].content.type) {
                    case "text":
                        blockProps = (
                            <>
                                <div>Содержание:
                                    <ChangePropertiesField name={"symbols"}
                                                           type={"string"}
                                                           value={(selectedBlocks.length === 1) ? selectedBlocks[0].content.symbols : ""}
                                                           elems={selectedBlocks}
                                                           requireUpdate={content.requireUpdate}/>
                                </div>
                                <div>Шрифт:
                                    <ChangePropertiesField name={"fontFamily"}
                                                           type={"string"}
                                                           value={(selectedBlocks.length === 1) ? selectedBlocks[0].content.fontFamily : ""}
                                                           elems={selectedBlocks}
                                                           requireUpdate={content.requireUpdate}/>
                                </div>
                                <div>Размер шрифта:
                                    <ChangePropertiesField name={"fontSize"}
                                                           type={"number"}
                                                           value={(selectedBlocks.length === 1) ? selectedBlocks[0].content.fontSize.toString() : ""}
                                                           elems={selectedBlocks}
                                                           requireUpdate={content.requireUpdate}/>
                                </div>
                                <div>Цвет шрифта:
                                    <ChangePropertiesField name={"fontColor"}
                                                           type={"string"}
                                                           value={(selectedBlocks.length === 1) ? selectedBlocks[0].content.fontColor : ""}
                                                           elems={selectedBlocks}
                                                           requireUpdate={content.requireUpdate}/>
                                </div>
                            </>
                        );
                        break;
                    case "picture":
                        blockProps = (
                            <>
                                <div>Путь:
                                    <ChangePropertiesField name={"url"}
                                                           type={"string"}
                                                           value={(selectedBlocks.length === 1) ? selectedBlocks[0].content.url : ""}
                                                           elems={selectedBlocks}
                                                           requireUpdate={content.requireUpdate}/>
                                </div>
                            </>
                        )
                        break;
                    case "primitive":
                        blockProps = (
                            <>
                                <div>Тип фигуры:
                                    <ChangePropertiesButton name={"style"}
                                                            value={"ellipse"}
                                                            currentStyle={(selectedBlocks.length === 1) ? selectedBlocks[0].content.style : null}
                                                            elems={selectedBlocks}
                                                            requireUpdate={content.requireUpdate}/>
                                    <ChangePropertiesButton name={"style"}
                                                            value={"triangle"}
                                                            currentStyle={(selectedBlocks.length === 1) ? selectedBlocks[0].content.style : null}
                                                            elems={selectedBlocks}
                                                            requireUpdate={content.requireUpdate}/>
                                    <ChangePropertiesButton name={"style"}
                                                            value={"rectangle"}
                                                            currentStyle={(selectedBlocks.length === 1) ? selectedBlocks[0].content.style : null}
                                                            elems={selectedBlocks}
                                                            requireUpdate={content.requireUpdate}/>
                                </div>
                                <div>Цвет фигуры:
                                    <ChangePropertiesField name={"backgroundColor"}
                                                           type={"string"}
                                                           value={(selectedBlocks.length === 1) ? selectedBlocks[0].content.backgroundColor : ""}
                                                           elems={selectedBlocks}
                                                           requireUpdate={content.requireUpdate}/>
                                </div>
                                <div>Размер обводки:
                                    <ChangePropertiesField name={"borderSize"}
                                                           type={"number"}
                                                           value={(selectedBlocks.length === 1) ? selectedBlocks[0].content.borderSize.toString() : ""}
                                                           elems={selectedBlocks}
                                                           requireUpdate={content.requireUpdate}/>
                                </div>
                                <div>Цвет обводки:
                                    <ChangePropertiesField name={"borderColor"}
                                                           type={"string"}
                                                           value={(selectedBlocks.length === 1) ? selectedBlocks[0].content.borderColor : ""}
                                                           elems={selectedBlocks}
                                                           requireUpdate={content.requireUpdate}/>
                                </div>
                            </>
                        )
                        break;
                }
            }

            blocksProperties = (
            <div className={styles.propertiesContainer}>
                <div className={styles.propertiesTitle}>{(selectedBlocks.length === 1) ? "Свойства блока" : "Свойства блоков"}</div>
                <div className={styles.properties}>
                    <div>Позиция:
                        <ChangePropertiesField name={"positionX"}
                                               type={"number"}
                                               value={(selectedBlocks.length === 1) ? selectedBlocks[0].content.position.x.toString() : ""}
                                               elems={selectedBlocks}
                                               requireUpdate={content.requireUpdate}/>
                        <ChangePropertiesField name={"positionY"}
                                               type={"number"}
                                               value={(selectedBlocks.length === 1) ? selectedBlocks[0].content.position.y.toString() : ""}
                                               elems={selectedBlocks}
                                               requireUpdate={content.requireUpdate}/>
                    </div>
                    <div>Ширина:
                        <ChangePropertiesField name={"width"}
                                               type={"number"}
                                               value={(selectedBlocks.length === 1) ? selectedBlocks[0].content.width.toString() : ""}
                                               elems={selectedBlocks}
                                               requireUpdate={content.requireUpdate}/>
                    </div>
                    <div>Высота:
                        <ChangePropertiesField name={"height"}
                                               type={"number"}
                                               value={(selectedBlocks.length === 1) ? selectedBlocks[0].content.height.toString() : ""}
                                               elems={selectedBlocks}
                                               requireUpdate={content.requireUpdate}/>
                    </div>
                    <div>Поворот:
                        <ChangePropertiesField name={"angle"}
                                               type={"number"}
                                               value={(selectedBlocks.length === 1) ? selectedBlocks[0].content.position.angle.toString() : ""}
                                               elems={selectedBlocks}
                                               requireUpdate={content.requireUpdate}/>
                    </div>
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