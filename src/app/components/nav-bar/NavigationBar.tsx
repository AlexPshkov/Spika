import styles from "./NavigationBar.module.css";

function NavigationBar() {
    return (
        <div className={styles.navBar}>
            <span>[ICON]</span>
            <span>[Button]</span>
            <span>[Button]</span>
            <span>[Button]</span>
            <span>[Button]</span>
            <span>[Button]</span>
        </div>
    );
}

export default NavigationBar;