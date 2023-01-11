import {SlideType} from "../../../OurTypes";
import React from "react";
import styles from "../../information-panel/InformationPanel.module.css"



function ChangeSlidePropertiesPicture(content: { name: string, elems: SlideType[], globalUpdate: () => void }) {

    function updateProperties() {
        const fileInput = document.createElement("input")
        fileInput.type = "file"
        fileInput.click()
        fileInput.addEventListener("change", () => {
            const file = fileInput.files?.[0] as File

            if (file.type.includes("image")) {
                content.elems.forEach(elem => {
                    if (content.name === "background") elem[content.name] = "url(" + URL.createObjectURL(file) + ")"
                })
            }

            content.globalUpdate();
        })
    }


    return <button className={styles.propertyButton}
                   onClick={updateProperties}/>
}

export default ChangeSlidePropertiesPicture;