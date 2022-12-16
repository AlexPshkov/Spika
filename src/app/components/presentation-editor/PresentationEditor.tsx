import styles from "./PresentationEditor.module.css";
import SlideEditor from "../slide-editor/SlideEditor";
import ToolBar from "../tool-bar/ToolBar";
import NavigationBar from "../nav-bar/NavigationBar";
import {PresentationType, SlideType} from "../../OurTypes";
import SlidesList from "../slides-list/SlidesList";
import {useState} from "react";

function PresentationEditor(content: { presentation: PresentationType }) {
    const [presentation, setPresentation] = useState<PresentationType>(content.presentation);
    const slide = presentation.slides[0];

    function UpdateSlide( slide: SlideType ) {

        //TODO обновление конкретного слайда
        setPresentation(presentation);
    }

    return (
        <div className={styles.editor}>
            <NavigationBar name={presentation.name}
                           slides={presentation.slides}
                           selection={presentation.selection} />

            <div className={styles.horizontal}>
                <ToolBar />
                <SlideEditor slide={slide} updateSlide={elem => UpdateSlide(elem)} />
            </div>
            <div className={styles.slidesListContainer}>
                <SlidesList name={presentation.name} slides={presentation.slides} selection={presentation.selection} />
            </div>
        </div>
    );
}

export default PresentationEditor;