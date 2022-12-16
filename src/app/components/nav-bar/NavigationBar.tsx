import styles from "./NavigationBar.module.css";
import {PresentationType} from "../../OurTypes";
import Logo from "../../images/logo.svg";

function NavigationBar( { name }: PresentationType) {
    return (
        <div className={styles.navBar}>
            <div className={styles.logoContainer}><img src={Logo}/></div>
            <div className={styles.presentationName}>{name}</div>
            <div className={styles.exitButton}><img src={""} alt={"Exit"}/></div>
        </div>
    );
}

export default NavigationBar;