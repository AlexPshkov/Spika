import {BlockType} from "../../../OurTypes";
import styles from "./ChangePropertiesButton.module.css"
import ellipseIcon from "../../../images/ellipse.svg"
import triangleIcon from "../../../images/triangle.svg"
import rectangleIcon from "../../../images/rectangle.svg"


function ChangePropertiesButton(content: { name: string, value: "ellipse" | "triangle" | "rectangle", currentStyle: "ellipse" | "triangle" | "rectangle" | null, elems: BlockType[], requireUpdate: () => void}) {
    function updateProperties(value: string) {
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

        content.requireUpdate();
    }

    function getPicture() {
        switch (content.value) {
            case "ellipse":
                return ellipseIcon;
            case "triangle":
                return triangleIcon;
            case "rectangle":
                return rectangleIcon;
        }
    }

    return (
        <button className={(content.currentStyle === content.value) ? styles.selected : ""} name={content.name}
                type={"button"}
                value={content.value}
                onClick={(event) => updateProperties( event.currentTarget.value )}>
        <img src={getPicture()} alt={""}/>
        </button>
    )
}

export default ChangePropertiesButton;