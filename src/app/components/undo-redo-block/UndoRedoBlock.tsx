import styles from "./UndoRedoBlock.module.css"
import {PresentationType} from "../../OurTypes";
import {IUndoRedoService} from "../../services/undo-redo-service/UndoRedoService";
import RedoIcon from "@mui/icons-material/Redo";
import {IconButton} from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";


function UndoRedoBlock(content: { presentation: PresentationType, undoRedoService: IUndoRedoService }) {

    return <div className={styles.buttons}>
        <IconButton disabled={!content.undoRedoService.isAnyToUndo()}
                    onMouseDown={() => content.undoRedoService.makeUndo()}
                    sx={ { color: "black" } }
                    aria-label="add an alarm">
            <UndoIcon />
        </IconButton>

        <IconButton disabled={!content.undoRedoService.isAnyToRedo()}
                    onMouseDown={() => content.undoRedoService.makeRedo()}
                    sx={ { color: "black" } }
                    aria-label="add an alarm">
            <RedoIcon />
        </IconButton>
    </div>
}

export default UndoRedoBlock;