import styles from "./PresentationEditor.module.css";
import SlideEditor from "../slide-editor/SlideEditor";
import ToolBar from "../tool-bar/ToolBar";
import NavigationBar from "../nav-bar/NavigationBar";
import {PresentationType} from "../../OurTypes";
import SlidesList from "../slides-list/SlidesList";

function PresentationEditor( { name, slides, selection }: PresentationType) {
    const slide = slides[0];

    return (
        <div className={styles.editor}>
            <NavigationBar name={name}
                           slides={slides}
                           selection={selection} />

            <div className={styles.horizontal}>
                <ToolBar name={name}
                         slides={slides}
                         selection={selection}/>
                <SlideEditor id={slide.id}
                             blocks={slide.blocks}
                             selectedBlocks={slide.selectedBlocks}
                             background={slide.background}
                             resolution={slide.resolution}
                             isSelected={slide.isSelected} />
            </div>
            <div className={styles.slidesListContainer}>
                <SlidesList name={name} slides={slides} selection={selection} />
            </div>
        </div>
    );
}

export default PresentationEditor;