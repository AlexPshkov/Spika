import styles from "./InformationPanel.module.css"
import {PresentationType} from "../../OurTypes";

function InformationPanel( content: { presentation: PresentationType, requireUpdate: (presentation: PresentationType) => void }) {
    /*
    Universal:
        width
        height
        position:
            x
            y
            angle
    Text:
        fontFamily
        fontColor
        fontSize
        symbols
    Picture:
        url
    Primitive:
        style
        backgroundColor
        borderColor
        borderSize
     */

    // function creatProperties() {
    //
    // }
    //
    // function getBlockStyle()

    return <div className={styles.informationPanel}/>
}

export default InformationPanel;