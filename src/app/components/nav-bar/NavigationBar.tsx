import styles from "./NavigationBar.module.css";
import {PresentationType} from "../../OurTypes";
import logo from "../../images/logo_mini.svg";
import exitIcon from "../../images/exit.svg"
import saveIcon from "../../images/save.svg"

function NavigationBar( { name }: PresentationType) {
    return (
        <div className={styles.navBar}>
            <div className={styles.logoContainer}><img src={logo} alt={"logo"}/></div>
            <div className={styles.presentationName}>{name}</div>
            <div className={styles.exitButton}><img src={saveIcon} alt={"Save/export"}/><img src={exitIcon} alt={"Exit"}/></div>
        </div>
    );
}

export default NavigationBar;