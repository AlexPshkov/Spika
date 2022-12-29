import {SlideType} from "../../../OurTypes";
import React from "react";


function ChangeSlidePropertiesField(content: { name: string, type: "number" | "string", value: string, elems: SlideType[], localUpdate: () => void, globalUpdate: () => void }) {
    function onKeyDownHandler( keyEvent: React.KeyboardEvent<HTMLInputElement>) {
        if (keyEvent.key === 'Enter') content.globalUpdate();
    }

    function updateProperties( value: string ) {
        content.elems.forEach(elem => {
            switch (content.name) {
                case "background":
                    if (value.startsWith("http")) {
                        elem[content.name] = "url(" + value + ")";
                        break;
                    }
                    elem[content.name] = value;
                    break;
                case "width":
                case "height":
                    elem.resolution[content.name] = Number(value);
                    break;
            }
        })
        content.localUpdate();
    }


    return <input name={content.name}
                  type={content.type === "string" ? "text" : content.type}
                  value={(content.value.toString().startsWith("url(") && content.value.toString().endsWith(")")) ? content.value.slice(4, -1) : content.value}
                  onChange={(event) => updateProperties( event.target.value )}
                  onKeyDown={(event) => onKeyDownHandler(event)}/>
}

export default ChangeSlidePropertiesField;