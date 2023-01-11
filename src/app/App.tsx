import React, {useState} from 'react';
import PresentationEditor from "./components/presentation-editor/PresentationEditor";
import styles from "./App.module.css";
import {PresentationType} from "./OurTypes";
import {IUndoRedoService, UndoRedoService} from "./services/undo-redo-service/UndoRedoService";
import {SvgIcon} from "@mui/material";
import {ReactComponent as logo} from "../main/images/logo.svg"
import {ReactComponent as plusIcon} from "../main/images/plus.svg"
import {ReactComponent as uploadIcon} from "../main/images/upload.svg"
import {convertJSONToState} from "./utils/file-work/json-work/JsonWork";
import styles2 from "../main/Main.module.css"

const presentationKey: string = "spika_presentation";

function App() {
    const undoRedoServiceImplementation: IUndoRedoService = new UndoRedoService((presentation: PresentationType) => savePresentation(presentation));
    const [undoRedoService, setUndoRedoService] = useState<IUndoRedoService>(undoRedoServiceImplementation);
    const [currentPresentation, setPresentation] = useState<PresentationType>({...getPresentation()});

    function savePresentation(presentation: PresentationType) {
        localStorage.setItem(presentationKey, JSON.stringify(presentation));
        setPresentation({...presentation});
    }

    function updatePresentation(saveState: boolean = false) {
        if (!saveState) {
            setPresentation({...currentPresentation});
            return;
        }

        undoRedoService.handlePresentationChange(currentPresentation);
        savePresentation(currentPresentation);
    }

    function getPresentation(): PresentationType {
        const previousPresentationJson: string | null = localStorage.getItem(presentationKey);
        const presentation: PresentationType = previousPresentationJson == null ? getDefaultPresentation() : JSON.parse(previousPresentationJson);

        undoRedoService.setInitialState(presentation);
        return presentation;
    }

    function getDefaultPresentation(): PresentationType {
        return {
            name: "My presentation",
            slides: [
                {
                    id: 1,
                    isSelected: true,
                    blocks: [],
                    resolution: {
                        width: 900,
                        height: 600
                    },
                    background: "rgba(255, 255, 255, 1)"
                }
            ],
            currentSlideId: 1
        };
    }

    async function uploadPresentation() {
        const presentation = await convertJSONToState()
        savePresentation(presentation)
        openPresentation()
    }

    function newPresentation() {
        setPresentation(getDefaultPresentation)
        openPresentation()
    }

    function openPresentation() {
        const main = document.getElementById("main")!
        const app = document.getElementById("app")!
        main.hidden = true
        app.hidden = false
    }



    return (<>
        <div id={"main"}><div className={styles2.Main} >
            <header className="Main-header"/>
            <div className={styles2.content}>
                <SvgIcon className={styles2.logo} component={logo} inheritViewBox={true}/>
                <div className={styles2.buttons}>
                    <button onClick={newPresentation}>
                        <SvgIcon component={plusIcon} inheritViewBox={true}/>
                        <span>Создать новую презентацию</span>
                    </button>
                    <button onClick={uploadPresentation}>
                        <SvgIcon component={uploadIcon} inheritViewBox={true}/>
                        <span>Загрузить презентацию</span>
                    </button>
                </div>
            </div>
        </div></div>
        <div id={"app"}><div className={styles.App}>
            <header className="App-header"/>

            <PresentationEditor presentation={currentPresentation}
                                undoRedoService={undoRedoService}
                                updatePresentation={(saveState: boolean = false) => updatePresentation(saveState)}/>
        </div></div></>
    );
}


export default App;
