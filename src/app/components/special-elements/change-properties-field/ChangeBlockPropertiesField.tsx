import {BlockType} from "../../../OurTypes";
import React from "react";
import styles from "../../information-panel/InformationPanel.module.css";


function ChangeBlockPropertiesField(content: { name: string, type: "number" | "string", value: string, elems: BlockType[], localUpdate: () => void, globalUpdate: () => void }) {
    function onKeyDownHandler( keyEvent: React.KeyboardEvent<HTMLInputElement>) {
        if (keyEvent.key === 'Enter') content.globalUpdate();
    }

    function updateProperties( value: string ) {
        content.elems.forEach(elem => {
            switch (content.name) {
                case "x":
                case "y":
                case "angle":
                    elem.content.position[content.name] = Number(value);
                    break;
                case "width":
                case "height":
                    elem.content[content.name] = Number(value);
                    break;
            }
            switch (elem.content.type) {
                case "text":
                    switch (content.name) {
                        case "symbols":
                        case "fontFamily":
                        case "fontColor":
                            elem.content[content.name] = value;
                            break;
                        case "fontSize":
                            elem.content[content.name] = Number(value);
                            break;
                    }
                    break;
                case "picture":
                    if (content.name === "url") elem.content[content.name] = value;
                    break;
                case "primitive":
                    switch (content.name) {
                        case "backgroundColor":
                        case "borderColor":
                            elem.content[content.name] = value;
                            break;
                        case "borderSize":
                            elem.content[content.name] = Number(value);
                            break;
                    }
                    break;
            }
        })
        content.localUpdate();
    }


    return <input className={styles.propertyField}
                  name={content.name}
                  type={content.type === "string" ? "text" : content.type}
                  value={content.value}
                  onChange={(event) => updateProperties( event.target.value )}
                  onKeyDown={(event) => onKeyDownHandler(event)}/>
}

export default ChangeBlockPropertiesField;