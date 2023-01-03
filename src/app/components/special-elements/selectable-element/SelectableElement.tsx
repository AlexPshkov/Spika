import React, {ReactNode} from "react";
import {BlockType} from "../../../OurTypes";
import styles from "./SelectableElement.module.css";


function SelectableElement(content: { element: ReactNode, elementContext: BlockType, selectUpdateFunc: (isSelected: boolean) => void }) {

    function onClickHandler() {
        content.selectUpdateFunc(!content.elementContext.isSelected);
    }

    return (
        <div onClick={() => onClickHandler()}
             className={content.elementContext.isSelected ? styles.selectedElement : styles.nonSelectedElement}>
            {content.element}
        </div>
    )
}

export default SelectableElement