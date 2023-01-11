import styles from "./NavigationBar.module.css";
import {PresentationType} from "../../OurTypes";
import logo from "../../images/logo_mini.svg";
import {ReactComponent as exitIcon} from "../../images/exit.svg"
import {ReactComponent as saveIcon} from "../../images/save.svg"
import {useState} from "react";
import ChangePresentationNameField
    from "../special-elements/change-properties-field/ChangePresentationNameField";
import {SvgIcon} from "@mui/material";
import {convertStateToJSON} from "../../utils/file-work/json-work/JsonWork";

function NavigationBar( content: { presentation: PresentationType, requireUpdate: () => void} ) {
    const [presentation, setPresentation] = useState<PresentationType>({...content.presentation})

    function globalUpdate() {
        content.presentation.name = presentation.name;
        content.requireUpdate();
    }

    function localUpdate() {
        setPresentation({...presentation})
    }

    return (
        <div className={styles.navBar}>
            <div className={styles.logoContainer}><img src={logo} alt={"logo"}/></div>
            <ChangePresentationNameField presentation={presentation}
                                         value={presentation.name}
                                         localUpdate={() => localUpdate()}
                                         globalUpdate={() => globalUpdate()}/>
            <div className={styles.buttons}>
                <button className={styles.button} onClick={() => convertStateToJSON(content.presentation)}><SvgIcon component={saveIcon} inheritViewBox={true}/></button>
                <button className={styles.button}><SvgIcon component={exitIcon} inheritViewBox={true}/></button>
            </div>
        </div>
    );
}

export default NavigationBar;