import {PresentationType} from "../../../OurTypes";
import React from "react";
import styles from "./ChangePresentationNameField.module.css"


function ChangePresentationNameField(content: { presentation: PresentationType, value: string, requireUpdate: ( saveState: boolean ) => void }) {

    function onKeyDownHandler( keyEvent: React.KeyboardEvent<HTMLInputElement>) {
        if (keyEvent.key === 'Enter') {
            content.requireUpdate( true );
        }
    }

    function updateProperties( value: string ) {
        content.presentation.name = value;
        content.requireUpdate( false );
    }

    return <input className={styles.presentationName}
                  type={"text"}
                  value={content.value}
                  onChange={(event) => updateProperties( event.target.value )}
                  onKeyDown={(event) => onKeyDownHandler(event)}/>
}

export default ChangePresentationNameField;