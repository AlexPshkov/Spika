import styles from "./InformationPanel.module.css"
import {BlockType, PresentationType, SlideType} from "../../OurTypes";
import {useState} from "react";
import ChangeBlockPropertiesField from "../special-elements/change-properties-field/ChangeBlockPropertiesField";
import ChangeBlockPropertiesButton from "../special-elements/change-properties-button/ChangeBlockPropertiesButton";
import ChangeSlidePropertiesField from "../special-elements/change-properties-field/ChangeSlidePropertiesField";
import ChangeBlockPropertiesColorPicker
    from "../special-elements/change-properties-button/ChangeBlockPropertiesColorPicker";
import ChangeSlidePropertiesColorPicker
    from "../special-elements/change-properties-button/ChangeSlidePropertiesColorPicker";
import ChangeSlidePropertiesButton from "../special-elements/change-properties-button/ChangeSlidePropertiesButton";

function InformationPanel( content: { presentation: PresentationType, requireUpdate: () => void }) {
    const [presentation, setPresentation] = useState<PresentationType>({...content.presentation})
    const slides: SlideType[] = presentation.slides
    if (slides !== content.presentation.slides) setPresentation({...content.presentation})

    // Blocks
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
        {key: "size", value: "Размер"},
        {key: "angle", value: "Поворот"}
    ]
    const primitiveStyles = ["ellipse", "triangle", "rectangle"]

    // Slides
    const slideFields = [
        {key: "resolution", value: "Размер"},
        {key: "background", value: "Фон"}
    ]

    function globalUpdate() {
        content.presentation.slides = slides;
        content.requireUpdate();
    }

    function localUpdate() {
        setPresentation({...presentation});
    }

    function createSlideProperties(): any {
        const selectedSlides: SlideType[] = [];
        let slidesProperties: any;

        slides.forEach(slide => {
            if ( slide.isSelected ) selectedSlides.push(slide)
        });

        if (selectedSlides.length) {
            const similarSlideValues = getSimilarValuesOfSlides(selectedSlides);
            slidesProperties = (
                <div className={styles.propertiesContainer}>
                    <div className={styles.propertiesTitle}>{(selectedSlides.length === 1) ? "Свойства слайда" : "Свойства слайдов"}</div>
                    <div className={styles.properties}>
                        {slideFields.map(({key, value}) => visualizeSlideProperty(key, value, selectedSlides, similarSlideValues))}
                    </div>
                </div>
            )

            return {...slidesProperties}
        }
    }

    function createBlockProperties(): any {
        const currentSlide = (slides.find(slide => slide.id === content.presentation.currentSlideId));
        const selectedBlocks: BlockType[] = [];

        currentSlide?.blocks.forEach( block => {
            if ( block.isSelected ) selectedBlocks.push(block)
        });

        let blocksProperties: any;
        let blockProps: any;

        if (selectedBlocks.length) {
            const similarBlockValues = getSimilarValuesOfBlocks(selectedBlocks);
            if (similarBlockValues.has("type")) {
                switch (selectedBlocks[0].content.type) {
                    case "text":
                        blockProps = textFields.map(({key, value}) =>
                            visualizeBlockProperty(key, value, selectedBlocks, similarBlockValues))
                        break;
                    case "picture":
                        blockProps = pictureFields.map(({key, value}) =>
                            visualizeBlockProperty(key, value, selectedBlocks, similarBlockValues))
                        break;
                    case "primitive":
                        blockProps = primitiveFields.map(({key, value}) =>
                            visualizeBlockProperty(key, value, selectedBlocks, similarBlockValues))
                        break;
                }
            }

            blocksProperties = (
            <div className={styles.propertiesContainer}>
                <div className={styles.propertiesTitle}>{(selectedBlocks.length === 1) ? "Свойства блока" : "Свойства блоков"}</div>
                <div className={styles.properties}>
                    {universalFields.map(({key, value}) => visualizeBlockProperty(key, value, selectedBlocks, similarBlockValues))}
                    {blockProps}
                </div>
            </div>)

            return {...blocksProperties};
        }
    }

    function visualizeSlideProperty(type: string, name: string, slides: SlideType[], similarSlideValues: Set<string>) {
        let content;

        switch (type){
            case "resolution":
                content = ["width", "height"].map(value => visualizeSlidePropField(value, slides, similarSlideValues))
                break;
            case "background":
                content = <>{visualizeSlidePropColorPicker(type, slides, similarSlideValues)}
                    {visualizeSlidePropButton(type, slides, similarSlideValues)}</>
                break;
            default:
                content = visualizeSlidePropField(type, slides, similarSlideValues)
        }

        return(
            <div className={styles.property}>{name}:
                {content}
            </div>
        )
    }

    function visualizeSlidePropColorPicker(type: string, slides: SlideType[], similarSlideValues: Set<string>) {
        // @ts-ignore
        let value = slides[0][type]

        return(
            <ChangeSlidePropertiesColorPicker name={type} color={similarSlideValues.has(type) ? value : ''} elems={slides} localUpdate={() => localUpdate()} globalUpdate={() => globalUpdate()}/>
        )
    }

    function visualizeSlidePropField(type: string, slides: SlideType[], similarSlideValues: Set<string>) {
        let value: any;

        if (["width", "height"].indexOf(type) >= 0) {
            // @ts-ignore
            value = slides[0].resolution[type];
        } else {
            // @ts-ignore
            value = slides[0][type];
        }

        return(
            <ChangeSlidePropertiesField name={type}
                                        type={(typeof value) as "string" | "number"}
                                        value={similarSlideValues.has(type) ? value : ""}
                                        elems={slides}
                                        localUpdate={() => localUpdate()}
                                        globalUpdate={() => globalUpdate()}/>
        )
    }

    function visualizeSlidePropButton(type: string, slides: SlideType[], similarSlideValues: Set<string>) {
        // @ts-ignore
        const value = slides[0][type]

        return <ChangeSlidePropertiesButton name={type}
                                            value={similarSlideValues.has(type) ? value : ""}
                                            elems={slides}
                                            localUpdate={() => localUpdate()}
                                            globalUpdate={() => globalUpdate()}/>
    }

    function visualizeBlockProperty(type: string, name: string, blocks: BlockType[], similarBlockValues: Set<string>) {
        let content;

        switch (type) {
            case "style":
                content = primitiveStyles.map(style => visualizeBlockPropButton(
                    style,
                    blocks,
                    similarBlockValues
                ))
                break;
            case "url":
                content = visualizeBlockPropButton(type, blocks, similarBlockValues)
                break;
            case "position":
                content = ["x", "y"].map(value => visualizeBlockPropField(
                    value,
                    blocks,
                    similarBlockValues
                ))
                break;
            case "size":
                content = ["width", "height"].map(value => visualizeBlockPropField(
                    value,
                    blocks,
                    similarBlockValues
                ))
                break;
            case "fontColor":
            case "backgroundColor":
            case "borderColor":
                content = visualizeBlockPropColorPicker(type, blocks, similarBlockValues)
                break;
            default:
                content = visualizeBlockPropField(type, blocks, similarBlockValues)
        }

        return(
            <div className={styles.property}>{name}:{content}</div>
        )
    }

    function visualizeBlockPropColorPicker(type: string, blocks: BlockType[], similarBlockValues: Set<string>) {
        // @ts-ignore
        let value = blocks[0].content[type]

        return(
            <ChangeBlockPropertiesColorPicker name={type} color={similarBlockValues.has(type) ? value : ''} elems={blocks} localUpdate={() => localUpdate()} globalUpdate={() => globalUpdate()}/>
        )
    }

    function visualizeBlockPropField(type: string, blocks: BlockType[], similarBlockValues: Set<string>) {
        let value: any;

        if (["x", "y", "angle"].indexOf(type) >= 0) {
            // @ts-ignore
            value = blocks[0].content.position[type];
        } else {
            // @ts-ignore
            value = blocks[0].content[type];
        }

        return(
            <ChangeBlockPropertiesField name={type}
                                        type={(typeof value) as "string" | "number"}
                                        value={similarBlockValues.has(type) ? value : ""}
                                        elems={blocks}
                                        localUpdate={() => localUpdate()}
                                        globalUpdate={() => globalUpdate()}/>
        )
    }

    function visualizeBlockPropButton(type: string, blocks: BlockType[], similarBlockValues: Set<string>) {
        switch (type) {
            case "rectangle":
            case "ellipse":
            case "triangle":
                const currentStyle = blocks[0].content.type === "primitive" ? blocks[0].content.style : null

                return(
                    <ChangeBlockPropertiesButton name={"style"}
                                                 value={type}
                                                 currentStyle={similarBlockValues.has("style") ? currentStyle : null}
                                                 elems={blocks}
                                                 localUpdate={() => localUpdate()}
                                                 globalUpdate={() => globalUpdate()}/>
                )
            case "url":
                // @ts-ignore
                const value = blocks[0].content[type];
                
                return(
                    <ChangeBlockPropertiesButton name={type}
                                                 value={similarBlockValues.has(type) ? value : ""}
                                                 elems={blocks}
                                                 localUpdate={() => localUpdate()}
                                                 globalUpdate={() => globalUpdate()}/>
                )
        }


    }

    function getSimilarValuesOfSlides( elems: SlideType[] ) {
        const similarValues = new Set<string>();

        for (let key in elems[0]) {
            if (key === "resolution") {
                for (let supKey in elems[0][key]) {
                    similarValues.add(supKey)
                }
            } else {
                similarValues.add(key)
            }
        }

        if (elems.length > 1) {
            for (let key in elems[0]) {
                for (let i = 1; i < elems.length; i++) {
                    if (key === "resolution") {
                        for (let supKey in elems[0][key]) {
                            // @ts-ignore
                            if (similarValues.has(supKey) && elems[0][key][supKey] !== elems[i][key][supKey]) {
                                similarValues.delete(supKey)
                            }
                        }
                    } else {
                        if (similarValues.has(key) && key in elems[i]) {
                            // @ts-ignore
                            if (elems[0][key] !== elems[i][key]) {
                                similarValues.delete(key)
                            }
                        }
                    }
                }
            }
        }

        return similarValues;
    }

    function getSimilarValuesOfBlocks( elems: BlockType[]) {
        const similarValues = new Set<string>();

        for (let key in elems[0].content) {
            if (key === "position") {
                for (let supKey in elems[0].content[key]) {
                    similarValues.add(supKey)
                }
            } else {
                similarValues.add(key)
            }
        }

        if (elems.length > 1) {
            for (let key in elems[0].content) {
                for (let elem of elems) {
                    if (key === "position") {
                        for (let supKey in elems[0].content[key]) {
                            // @ts-ignore
                            if (similarValues.has(supKey) && elems[0].content[key][supKey] !== elem.content[key][supKey]) {
                                similarValues.delete(supKey)
                            }
                        }
                    } else {
                        if (similarValues.has(key) && key in elem.content) {
                            // @ts-ignore
                            if (elems[0].content[key] !== elem.content[key]) {
                                similarValues.delete(key)
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