import styles from "./PresentationEditor.module.css";
import SlideEditor from "../slide-editor/SlideEditor";
import ToolBar from "../tool-bar/ToolBar";
import NavigationBar from "../nav-bar/NavigationBar";
import {PresentationType} from "../../OurTypes";
import SlidesList from "../slides-list/SlidesList";
import {useState} from "react";
import InformationPanel from "../information-panel/InformationPanel";

function PresentationEditor(content: { presentation: PresentationType }) {
    const [presentation, setPresentation] = useState<PresentationType>(content.presentation);
    let slide = presentation.slides.find(slide => slide.id === presentation.currentSlideId) || presentation.slides[0];

    function updatePresentation() {
        setPresentation({...presentation});
    }

    function updatePresent( presentation: PresentationType ) {

        setPresentation({...presentation});
    }

    return (
        <div className={styles.editor}>
            <NavigationBar name={presentation.name}
                           slides={presentation.slides}
                           selection={presentation.selection}
                           currentSlideId={presentation.currentSlideId}/>

            <div className={styles.horizontal}>
                <ToolBar presentation={presentation} requireUpdate={() => updatePresentation()}/>
                <div className={styles.slideField}>
                    <SlideEditor slide={slide} updatePresentation={() => updatePresentation()}/>
                    <SlidesList presentation={presentation} updateFunc={() => updatePresent(presentation)}/>
                </div>
                <InformationPanel presentation={presentation} requireUpdate={() => updatePresentation()}/>
            </div>

        </div>
    );
}

export default PresentationEditor;