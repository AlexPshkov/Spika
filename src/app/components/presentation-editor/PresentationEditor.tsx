import styles from "./PresentationEditor.module.css";
import SlideEditor from "../slide-editor/SlideEditor";
import ToolBar from "../tool-bar/ToolBar";
import NavigationBar from "../nav-bar/NavigationBar";
import {PresentationType} from "../../OurTypes";
import SlidesPanel from "../slides-panel/SlidesPanel";
import {useState} from "react";
import InformationPanel from "../information-panel/InformationPanel";

function PresentationEditor(content: { presentation: PresentationType }) {
    const [presentation, setPresentation] = useState<PresentationType>(content.presentation);
    const slide = presentation.slides.find(slide => slide.id === presentation.currentSlideId);

    function updatePresentation() {
        setPresentation({...presentation});
    }

    return (
        <div className={styles.editor}>
            <NavigationBar presentation={presentation} requireUpdate={() => updatePresentation()}/>

            <div className={styles.horizontal}>
                <ToolBar presentation={presentation} requireUpdate={() => updatePresentation()}/>
                <div className={styles.slideField}>
                    <SlideEditor slide={slide} updatePresentation={() => updatePresentation()}/>
                    <SlidesPanel presentation={presentation} updateFunc={() => updatePresentation()}/>
                </div>
                <InformationPanel presentation={presentation} requireUpdate={() => updatePresentation()}/>
            </div>

        </div>
    );
}

export default PresentationEditor;