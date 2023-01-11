import {BlockType} from "../../../OurTypes";
import React from "react";
import styles from "../../information-panel/InformationPanel.module.css"
import {SvgIcon} from "@mui/material";
import {ReactComponent as FolderIcon} from "../../../images/folder.svg"



function ChangeBlockPropertiesPicture(content: { name: string, elems: BlockType[], globalUpdate: () => void }) {

    function updateProperties() {
        const fileInput = document.createElement("input")
        fileInput.type = "file"
        fileInput.click()
        fileInput.addEventListener("change", () => {
            const file = fileInput.files?.[0] as File

            if (file.type.includes("image")) {
                content.elems.forEach(elem => {
                    if (elem.content.type === "picture" && content.name === "url") elem.content[content.name] = URL.createObjectURL(file)
                })
            }

            content.globalUpdate();
        })
    }


    return <button className={styles.propertyButton}
                   onClick={updateProperties}>
        <SvgIcon component={FolderIcon} inheritViewBox={true}/>
    </button>
}

export default ChangeBlockPropertiesPicture;