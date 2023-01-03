import {BlockType} from "../../../OurTypes";
import React, {useState} from "react";
import {ChromePicker, Color, ColorResult} from "react-color";
import {ReactComponent as PickColorIcon} from "../../../images/pick_color.svg";
import {SvgIcon} from "@mui/material";
import styles from "../../information-panel/InformationPanel.module.css";


function ChangeBlockPropertiesColorPicker(content: { name: string, color: string, elems: BlockType[], localUpdate: () => void, globalUpdate: () => void }) {
    const [state, setState] = useState<boolean>(false)
    const colorRGB = content.color.split("(")[1].slice(0, -1).split(", ")
    const color: Color = {
        r: Number(colorRGB[0]),
        g: Number(colorRGB[1]),
        b: Number(colorRGB[2]),
        a: Number(colorRGB[3])
    }

    const popover: React.CSSProperties = {
        position: 'absolute',
        zIndex: '100',
        right: '20px',
    }
    const cover: React.CSSProperties = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    }

    function updateProperties( colorResult: ColorResult ) {
        const colorText = "rgba(" + colorResult.rgb.r + ", " + colorResult.rgb.g + ", " + colorResult.rgb.b + ", " + colorResult.rgb.a + ")"
        content.elems.forEach(elem => {
            switch (elem.content.type) {
                case "text":
                    if (content.name === "fontColor") {
                        elem.content[content.name] = colorText;
                    }
                    break;
                case "primitive":
                    if (content.name === "backgroundColor" || content.name === "borderColor") {
                        elem.content[content.name] = colorText;
                    }
                    break;
            }
        })
        content.localUpdate();
    }


    return <div>
        <button className={styles.propertyButton + " " + (state ? styles.propertyButtonSelected : "")}
                onClick={() => setState(!state) }>
            <SvgIcon component={PickColorIcon} inheritViewBox={true}/>
        </button>
        { state ? <div style={ popover }>
            <div style={ cover } onClick={() => setState(!state) }/>
            <ChromePicker color={color}
                          onChange={(color) => updateProperties( color )}
                          onChangeComplete={content.globalUpdate}/>
        </div> : null }
    </div>
}

export default ChangeBlockPropertiesColorPicker;