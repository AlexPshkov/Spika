import styles from "./NavigationBar.module.css";
import {PresentationType} from "../../OurTypes";
import logo from "../../images/logo_mini.svg";
import exitIcon from "../../images/exit.svg"
import saveIcon from "../../images/save.svg"
import {useState} from "react";
import ChangePresentationNameField
    from "../special-elements/change-presentation-name-field/ChangePresentationNameField";

function NavigationBar( content: { presentation: PresentationType, requireUpdate: () => void} ) {
    const [presentation, setPresentation] = useState<PresentationType>({...content.presentation})

    function globalUpdate() {
        content.presentation = presentation;
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
            <div className={styles.exitButton}><img src={saveIcon} alt={"Save/export"}/><img src={exitIcon} alt={"Exit"}/></div>
        </div>
    );
}

export default NavigationBar;