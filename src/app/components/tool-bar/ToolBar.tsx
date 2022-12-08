import styles from "./ToolBar.module.css";

function ToolBar() {

    return (
        <div className={styles.toolBar}>
            <div className={styles.tool}><img src={""} alt={"Tool"}/></div>
            <div className={styles.tool}><img src={""} alt={"Tool"}/></div>
            <div className={styles.tool}><img src={""} alt={"Tool"}/></div>
            <div className={styles.tool}><img src={""} alt={"Tool"}/></div>
            <div className={styles.tool + " " + styles.toolSelected}><img src={""} alt={"Tool"}/></div>
            <div className={styles.tool}><img src={""} alt={"Tool"}/></div>
            <div className={styles.tool}><img src={""} alt={"Tool"}/></div>
        </div>
    );
}

export default ToolBar;