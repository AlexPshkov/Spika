import React, {useState} from 'react';
import PresentationEditor from "./components/presentation-editor/PresentationEditor";
import styles from "./App.module.css";
import {PresentationType} from "./OurTypes";
import {IUndoRedoService, UndoRedoService} from "./services/undo-redo-service/UndoRedoService";

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
            name: "",
            slides: [
                {
                    id: 1,
                    isSelected: true,
                    blocks: [],
                    resolution: {
                        width: 900,
                        height: 600
                    },
                    background: "white"
                }
            ],
            currentSlideId: 1
        };
    }

    return (
        <div className={styles.App}>
            <header className="App-header"/>

            <PresentationEditor presentation={currentPresentation}
                                undoRedoService={undoRedoService}
                                updatePresentation={(saveState: boolean = false) => updatePresentation(saveState)}/>
        </div>
    );
}


export default App;
