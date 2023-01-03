import {SlideType} from "../../../OurTypes";
import styles from "../../information-panel/InformationPanel.module.css"
import {ReactComponent as LinkIcon} from "../../../images/link.svg"
import {SvgIcon} from "@mui/material";
import React, {useState} from "react";


function ChangeSlidePropertiesButton(content: { name: string, value: string, elems: SlideType[], localUpdate: () => void, globalUpdate: () => void}) {
    const [state, setState] = useState<boolean>(false)

    function onKeyDownHandler( keyEvent: React.KeyboardEvent<HTMLInputElement>) {
        if (keyEvent.key === 'Enter') {
            setState(!state)
            content.globalUpdate();
        }
    }

    function updateStyleProperties(value: string) {
        content.elems.forEach(elem => {
            if (content.name === "background") {
                if (value.startsWith("http")) {
                    elem[content.name] = "url(" + value + ")"
                } else {
                    elem[content.name] = value
                }
            }
        })

        content.localUpdate()
    }

    return state ?
        <input className={styles.propertyField}
               name={content.name}
               type={"string"}
               value={(content.value.toString().startsWith("url(") && content.value.toString().endsWith(")")) ? content.value.slice(4, -1) : !content.value.startsWith("rgba(") ? content.value : ""}
               onChange={(event) => updateStyleProperties(event.target.value)}
               onKeyDown={(event) => onKeyDownHandler(event)}/>
        : <button className={styles.propertyButton + " " + (state ? styles.propertyButtonSelected : "")}
                  onClick={() => setState(!state)}>
            <SvgIcon component={LinkIcon} inheritViewBox={true}/>
        </button>
}

export default ChangeSlidePropertiesButton;