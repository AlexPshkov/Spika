import styles from "./PresentationEditor.module.css";
import SlideEditor from "../slide-editor/SlideEditor";
import ToolBar from "../tool-bar/ToolBar";
import NavigationBar from "../nav-bar/NavigationBar";
import {PresentationType} from "../../OurTypes";
import SlidesPanel from "../slides-panel/SlidesPanel";
import InformationPanel from "../information-panel/InformationPanel";
import {IUndoRedoService} from "../../services/undo-redo-service/UndoRedoService";

function PresentationEditor(content: { presentation: PresentationType, undoRedoService: IUndoRedoService, updatePresentation: ( saveState: boolean ) => void }) {
    const slide = content.presentation.slides.find(slide => slide.id === content.presentation.currentSlideId);

    document.onkeydown = (event) => {
        if ( event.ctrlKey && event.code === "KeyZ" ) {
            content.undoRedoService.makeUndo();
            return;
        }

        if ( event.ctrlKey && event.code === "KeyY" ) {
            content.undoRedoService.makeRedo();
            return;
        }
    }

    return (
        <div className={styles.editor}>
            <NavigationBar presentation={content.presentation} requireUpdate={( saveState: boolean = false ) => content.updatePresentation( saveState )}/>

            <div className={styles.horizontal}>
                <ToolBar presentation={content.presentation} requireUpdate={( saveState: boolean = false ) => content.updatePresentation( saveState )}/>
                <div className={styles.slideField}>
                    <div className={styles.slideContainer}>
                        <SlideEditor slide={slide} updatePresentation={( saveState: boolean = false ) => content.updatePresentation( saveState )}/>
                    </div>
                    <SlidesPanel presentation={content.presentation} updateFunc={( saveState: boolean = false ) => content.updatePresentation( saveState )}/>
                </div>
                <InformationPanel presentation={content.presentation} undoRedoService={content.undoRedoService} requireUpdate={( saveState: boolean = false ) => content.updatePresentation( saveState )}/>
            </div>

        </div>
    );
}

export default PresentationEditor;