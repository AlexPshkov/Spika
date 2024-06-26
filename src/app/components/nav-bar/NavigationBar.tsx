import styles from "./NavigationBar.module.css";
import {PresentationType} from "../../OurTypes";
import logo from "../../images/logo_mini.svg";
import {ReactComponent as exitIcon} from "../../images/exit.svg"
import {ReactComponent as saveIcon} from "../../images/save.svg"
import ChangePresentationNameField
    from "../special-elements/change-properties-field/ChangePresentationNameField";
import {SvgIcon} from "@mui/material";
import {PdfConverter} from "../../services/pdf-converter/PdfConverter";
import {convertStateToJSON} from "../../utils/file-work/json-work/JsonWork";

function NavigationBar( content: { presentation: PresentationType, requireUpdate: ( saveState: boolean ) => void} ) {

    // function getPdf() {
    //     PdfConverter.getPdf(content.presentation);
    // }

    function exit() {
        const main = document.getElementById("main")!
        const app = document.getElementById("app")!
        main.hidden = false
        app.hidden = true
    }


    return (
        <div className={styles.navBar}>
            <div className={styles.logoContainer}><img src={logo} alt={"logo"}/></div>
            <ChangePresentationNameField presentation={content.presentation}
                                         value={content.presentation.name}
                                         requireUpdate={( saveState: boolean ) => content.requireUpdate( saveState )}/>
            <div className={styles.buttons}>
                <button className={styles.button} onClick={() => convertStateToJSON(content.presentation)}><SvgIcon component={saveIcon} inheritViewBox={true}/></button>
                <button className={styles.button} onClick={exit}><SvgIcon component={exitIcon} inheritViewBox={true}/></button>
            </div>
        </div>
    );
}

export default NavigationBar;