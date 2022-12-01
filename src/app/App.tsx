import React from 'react';
import PresentationEditor from "./components/presentation-editor/PresentationEditor";
import styles from "./App.module.css";
import {BlockType, PresentationType, SlideType} from "./OurTypes";

function App() {

    const blocks: BlockType[] = [
        {
            id: "",
            content: {
                type: "picture",
                url: "https://demotivation.ru/wp-content/uploads/2021/06/5-27.jpg",
                width: 200,
                height: 200,
                position: {
                    point: {
                        x: 150,
                        y: 0
                    },
                    angle: {
                        degrees: 0
                    }
                }
            }
        },
        {
            id: "",
            content: {
                type: "text",
                symbols: "HELP ME PLEASE",
                width: 200,
                height: 200,
                fontFamily: "",
                fontColor: "red",
                fontSize: 20,
                position: {
                    point: {
                        x: 150,
                        y: 150
                    },
                    angle: {
                        degrees: 0
                    }
                }
            }
        }
    ]

    const slides: SlideType[] = [
        {
            id: 1,
            blocks: blocks,
            background: "green",
            resolution: {
                width: 600,
                height: 600
            },
            selectedBlocks: []
        }
    ];

    const presentationParams: PresentationType = {
        name: "Some presentation name",
        slides: slides,
        selection: {
            selectedSlides: []
        }
    };


  return (
    <div className={styles.App}>
      <header className="App-header"></header>

      <PresentationEditor
          name={presentationParams.name}
          slides={presentationParams.slides}
          selection={presentationParams.selection} />
    </div>
  );
}

export default App;