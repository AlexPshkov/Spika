import {BlockType} from "../../../OurTypes";
import styles from "../../information-panel/InformationPanel.module.css"
import {ReactComponent as ellipseIcon} from "../../../images/ellipse.svg"
import {ReactComponent as triangleIcon} from "../../../images/triangle.svg"
import {ReactComponent as rectangleIcon} from "../../../images/rectangle.svg"
import {ReactComponent as LinkIcon} from "../../../images/link.svg"
import {SvgIcon} from "@mui/material";
import React, {useState} from "react";


function ChangeBlockPropertiesButton(content: { name: string, value: string, currentStyle?: "ellipse" | "triangle" | "rectangle" | null, elems: BlockType[], localUpdate: () => void, globalUpdate: () => void}) {
    const [state, setState] = useState<boolean>(false)

    function updateStyleProperties(value: string) {
        content.elems.forEach(elem => {
            if (elem.content.type === "primitive") {
                switch (value) {
                    case "ellipse":
                        elem.content.style = "ellipse";
                        break;
                    case "triangle":
                        elem.content.style = "triangle";
                        break;
                    case "rectangle":
                        elem.content.style = "rectangle";
                        break;
                }
            }
        })

        content.globalUpdate();
    }

    function onKeyDownHandler( keyEvent: React.KeyboardEvent<HTMLInputElement>) {
        if (keyEvent.key === 'Enter') {
            setState(!state)
            content.globalUpdate();
        }
    }

    function updateImage(value: string) {
        content.elems.forEach(elem => {
            if (elem.content.type === "picture" && content.name === "url") elem.content[content.name] = value
        })

        content.localUpdate()
    }

    function getPrimitivePicture() {
        switch (content.value) {
            case "ellipse":
                return ellipseIcon;
            case "triangle":
                return triangleIcon;
            default:
                return rectangleIcon;
        }
    }

    let result: any;

    if (content.name === "style") {
        result = <button
            className={styles.propertyButton + " " + ((content.currentStyle === content.value) ? styles.propertyButtonSelected : "")}
            name={content.name}
            value={content.value}
            onClick={(event) => updateStyleProperties(event.currentTarget.value)}>
            <SvgIcon component={getPrimitivePicture()} inheritViewBox={true}/>
        </button>
    } else {
        result = state ?
            <input className={styles.propertyField}
                   name={content.name}
                   type={"string"}
                   value={content.value}
                   onChange={(event) => updateImage(event.target.value)}
                   onKeyDown={(event) => onKeyDownHandler(event)}/>
            : <button className={styles.propertyButton + " " + (state ? styles.propertyButtonSelected : "")}
                      onClick={() => setState(!state)}>
                <SvgIcon component={LinkIcon} inheritViewBox={true}/>
            </button>
    }

    return result
}

export default ChangeBlockPropertiesButton;