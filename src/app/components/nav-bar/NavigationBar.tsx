import styles from "./NavigationBar.module.css";
import {PresentationType} from "../../OurTypes";

function NavigationBar( { name }: PresentationType) {
    return (
        <div className={styles.navBar}>
            <div className={styles.logoContainer}><img src={""} alt={"Logo"}/></div>
            <div className={styles.presentationName}>{name}</div>
            <div className={styles.exportButton}><img src={""} alt={"Export"}/></div>
        </div>
    );
}

export default NavigationBar;