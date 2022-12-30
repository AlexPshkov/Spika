import React from 'react';
import PresentationEditor from "./components/presentation-editor/PresentationEditor";
import styles from "./App.module.css";
import {BlockType, PresentationType, SlideType} from "./OurTypes";

function App() {

    const blocks: BlockType[] = [
        {
            id: 3,
            isSelected: true,
            content: {
                type: "picture",
                url: "https://demotivation.ru/wp-content/uploads/2021/06/5-27.jpg",
                width: 200,
                height: 200,
                position: {
                    x: 50,
                    y: 300,
                    angle: 60
                }
            }
        },
        {
            id: 1,
            isSelected: true,
            content: {
                type: "text",
                symbols: "Sle-e-e-ep....",
                width: 50,
                height: 150,
                fontFamily: "",
                fontColor: "rgba(0, 0, 0, 1)",
                fontSize: 20,
                position: {
                    x: 150,
                    y: 400,
                    angle: 0
                }
            }
        },
        {
            id: 2,
            isSelected: false,
            content: {
                type: "primitive",
                style: "triangle",
                width: 100,
                height: 50,
                backgroundColor: "rgb(255,255,255, 1)",
                borderColor: "rgba(0, 0, 0, 1)",
                borderSize: 5,
                position: {
                    x: 200,
                    y: 200,
                    angle: 0
                }
            }
        }
    ]

    const slides: SlideType[] = [
        {
            id: 1,
            blocks: blocks,
            background: "white",
            resolution: {
                width: 600,
                height: 600
            },
            isSelected: true,
            selectedBlocks: []
        },
        {
            id: 2,
            blocks: [],
            background: "white",
            resolution: {
                width: 1000,
                height: 500
            },
            isSelected: false,
            selectedBlocks: []
        }
    ];

    const presentation: PresentationType = {
        name: "Some presentation name",
        slides: slides,
        selection: {
            selectedSlides: []
        },
        currentSlideId: 1
    };


  return (
    <div className={styles.App}>
      <header className="App-header"/>

      <PresentationEditor presentation={presentation}/>
    </div>
  );
}

export default App;
