import styles from "./InformationPanel.module.css"
import {BlockType, PresentationType, SlideType} from "../../OurTypes";
import ChangePropertiesField from "../special-elements/change-properties-field/ChangePropertiesField";
import ChangePropertiesButton from "../special-elements/change-properties-button/ChangePropertiesButton";
import {useState} from "react";

function InformationPanel( content: { presentation: PresentationType, requireUpdate: () => void }) {
    const [presentation, setSlides] = useState<PresentationType>({...content.presentation});
    const slides: SlideType[] = presentation.slides;

    const textFields = [
        {key: "symbols", value: "Содержание"},
        {key: "fontFamily", value: "Шрифт"},
        {key: "fontSize", value: "Размер шрифта"},
        {key: "fontColor", value: "Цвет шрифта"}
    ]
    const pictureFields = [
        {key: "url", value: "Путь"}
    ]
    const primitiveFields = [
        {key: "style", value: "Тип фигуры"},
        {key: "backgroundColor", value: "Цвет фигуры"},
        {key: "borderSize", value: "Размер обводки"},
        {key: "borderColor", value: "Цвет обводки"}
    ]
    const universalFields = [
        {key: "position", value: "Позиция"},
        {key: "width", value: "Ширина"},
        {key: "height", value: "Высота"},
        {key: "angle", value: "Поворот"}
    ]
    const primitiveStyles = ["ellipse", "triangle", "rectangle"]

    function globalUpdate() {
        content.presentation.slides = slides;
        content.requireUpdate();
    }

    function localUpdate() {
        setSlides({...presentation});
    }

    function createSlideProperties(): any {
        const selectedSlides: SlideType[] = [];
        let slidesProperties: any = <></>;

        slides.forEach(slide => {
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
        const currentSlide = (slides.find(slide => {return slide.id === content.presentation.currentSlideId})) || slides[0];
        const selectedBlocks: BlockType[] = [];

        currentSlide.blocks.forEach( block => {
            if ( block.isSelected ) selectedBlocks.push(block)
        });

        let blocksProperties: any = <></>;
        let blockProps: any = <></>;

        if (selectedBlocks.length) {
            const similarBlockValues = getSimilarValues(selectedBlocks);
            if (similarBlockValues.includes("type")) {
                switch (selectedBlocks[0].content.type) {
                    case "text":
                        blockProps = textFields.map(({key, value}) =>
                            visualizeProperty(key, value, selectedBlocks, similarBlockValues))
                        break;
                    case "picture":
                        blockProps = pictureFields.map(({key, value}) =>
                            visualizeProperty(key, value, selectedBlocks, similarBlockValues))
                        break;
                    case "primitive":
                        blockProps = primitiveFields.map(({key, value}) =>
                            visualizeProperty(key, value, selectedBlocks, similarBlockValues))
                        break;
                }
            }

            blocksProperties = (
            <div className={styles.propertiesContainer}>
                <div className={styles.propertiesTitle}>{(selectedBlocks.length === 1) ? "Свойства блока" : "Свойства блоков"}</div>
                <div className={styles.properties}>
                    {universalFields.map(({key, value}) => visualizeProperty(key, value, selectedBlocks, similarBlockValues))}
                    {blockProps}
                </div>
            </div>)
        }
        return {...blocksProperties};
    }

    function visualizeProperty(type: string, name: string, blocks: BlockType[], similarBlockValues: string[]) {
        return (
            <div>{name}:
                {(type === "style") ?
                    primitiveStyles.map(style =>
                        visualizeButton(style as "ellipse" | "triangle" | "rectangle", blocks, similarBlockValues))
                    : (type === "position") ?
                        ["x", "y"].map(value => visualizeField(value, blocks, similarBlockValues))
                        : visualizeField(type, blocks, similarBlockValues)}
            </div>)
    }

    function visualizeField(type: string, blocks: BlockType[], similarBlockValues: string[]) {
        let value: any;
        if (["x", "y", "angle"].indexOf(type) >= 0) {
            // @ts-ignore
            value = blocks[0].content.position[type];
        } else {
            // @ts-ignore
            value = blocks[0].content[type];
        }

        return(
            <ChangePropertiesField name={type}
                                   type={(typeof value) as "string" | "number"}
                                   value={similarBlockValues.includes(type) ? value : ""}
                                   elems={blocks}
                                   localUpdate={() => localUpdate()}
                                   globalUpdate={() => globalUpdate()}/>
        )
    }

    function visualizeButton(style: "ellipse" | "triangle" | "rectangle", blocks: BlockType[], similarBlockValue: string[]) {
        const currentStyle = blocks[0].content.type === "primitive" ? blocks[0].content.style : null
        return(
            <ChangePropertiesButton name={"style"}
                                    value={style}
                                    currentStyle={similarBlockValue.includes("style") ? currentStyle : null}
                                    elems={blocks}
                                    requireUpdate={() => globalUpdate()}/>
        )
    }

    function getSimilarValues( blocks: BlockType[]) {
        const similarValues: string[] = [];

        for (let key in blocks[0].content) {
            if (key === "position") {
                for (let supKey in blocks[0].content[key]) {
                    similarValues.push(supKey)
                }
            } else {
                similarValues.push(key)
            }
        }

        if (blocks.length > 1) {
            for (let key in blocks[0].content) {
                for (let i = 1; i < blocks.length; i++) {
                    if (key === "position") {
                        for (let supKey in blocks[0].content[key]) {
                            // @ts-ignore
                            if (similarValues.includes(supKey) && blocks[0].content[key][supKey] !== blocks[i].content[key][supKey]) {
                                similarValues.splice(similarValues.indexOf(supKey), 1)
                            }
                        }
                    } else {
                        if (similarValues.includes(key) && key in blocks[i].content) {
                            // @ts-ignore
                            if (blocks[0].content[key] !== blocks[i].content[key]) {
                                similarValues.splice(similarValues.indexOf(key), 1)
                            }
                        }
                    }
                }
            }
        }

        return similarValues;
    }

    return (<div className={styles.informationPanel}>
        {createBlockProperties()}
        {createSlideProperties()}
    </div>)
}

export default InformationPanel;