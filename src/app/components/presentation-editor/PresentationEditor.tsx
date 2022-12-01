import styles from "./PresentationEditor.module.css";
import SlideEditor from "../slide-editor/SlideEditor";
import ToolBar from "../tool-bar/ToolBar";
import NavigationBar from "../nav-bar/NavigationBar";
import {PresentationType} from "../../OurTypes";

function PresentationEditor( { name, slides, selection }: PresentationType) {
    const slide = slides[0];

    return (
        <div className={styles.editor}>
            <NavigationBar />

            <div className={styles.horizontal}>
                <ToolBar />
                <SlideEditor id={slide.id}
                             blocks={slide.blocks}
                             selectedBlocks={slide.selectedBlocks}
                             background={slide.background}
                             resolution={slide.resolution} />
            </div>
            <span className={styles.accentColor} >Name: {name}</span>
        </div>
    );
}

export default PresentationEditor;