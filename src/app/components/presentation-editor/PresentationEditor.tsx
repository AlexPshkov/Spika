import styles from "./PresentationEditor.module.css";
import SlideEditor from "../slide-editor/SlideEditor";
import ToolBar from "../tool-bar/ToolBar";
import NavigationBar from "../nav-bar/NavigationBar";
import {PresentationType, SlideType} from "../../OurTypes";
import SlidesList from "../slides-list/SlidesList";
import {useState} from "react";
import InformationPanel from "../information-panel/InformationPanel";

function PresentationEditor(content: { presentation: PresentationType }) {
    const [presentation, setPresentation] = useState<PresentationType>(content.presentation);
    const slide = presentation.slides[0];

    function UpdatePresentation( presentation: PresentationType ) {
        setPresentation({...presentation});
    }


    function UpdateSlide( slide: SlideType ) {

        //TODO обновление конкретного слайда
        setPresentation(presentation);
    }

    return (
        <div className={styles.editor}>
            <NavigationBar name={presentation.name}
                           slides={presentation.slides}
                           selection={presentation.selection}
                           currentSlideId={presentation.currentSlideId}/>

            <div className={styles.horizontal}>
                <ToolBar presentation={presentation} requireUpdate={presentation => UpdatePresentation(presentation)}/>
                <div className={styles.slideField}>
                    <SlideEditor slide={slide} updateSlide={elem => UpdateSlide(elem)} />
                    <SlidesList name={presentation.name}
                                slides={presentation.slides}
                                selection={presentation.selection}
                                currentSlideId={presentation.currentSlideId}/>
                </div>
                <InformationPanel presentation={presentation} requireUpdate={presentation => UpdatePresentation(presentation)}/>
            </div>

        </div>
    );
}

export default PresentationEditor;