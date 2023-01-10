import React from 'react';
import PresentationEditor from "./components/presentation-editor/PresentationEditor";
import styles from "./App.module.css";
import {PresentationType} from "./OurTypes";

function App(content: {presentation?: PresentationType}) {

    let presentation: PresentationType

    if (typeof content.presentation === 'undefined') {
        presentation = {
            name: "Presentation name",
            slides: [
                {
                    id: 0,
                    blocks: [],
                    background: "rgb(255,255,255, 1)",
                    resolution: {
                        width: 600,
                        height: 600
                    },
                    isSelected: false
                }
            ],
            currentSlideId: 0
        }
    } else {
        presentation = content.presentation
    }

  return (
    <div className={styles.App}>
      <header className="App-header"/>

      <PresentationEditor presentation={presentation}/>
    </div>
  );
}


export default App;
