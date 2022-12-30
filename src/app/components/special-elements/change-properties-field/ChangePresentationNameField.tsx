import {PresentationType} from "../../../OurTypes";
import React from "react";
import styles from "./ChangePresentationNameField.module.css"


function ChangePresentationNameField(content: { presentation: PresentationType, value: string, localUpdate: () => void, globalUpdate: () => void }) {
    function onKeyDownHandler( keyEvent: React.KeyboardEvent<HTMLInputElement>) {
        if (keyEvent.key === 'Enter') content.globalUpdate();
    }

    function updateProperties( value: string ) {
        content.presentation.name = value;
        content.localUpdate();
    }

    return <input className={styles.presentationName}
                  type={"text"}
                  value={content.value}
                  onChange={(event) => updateProperties( event.target.value )}
                  onKeyDown={(event) => onKeyDownHandler(event)}/>
}

export default ChangePresentationNameField;