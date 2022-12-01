import styles from "./ToolBar.module.css";

function ToolBar() {

    return (
        <div className={styles.toolBar}>
            <span>[Tool_1]</span>
            <span>[Tool_2]</span>
            <span>[Tool_3]</span>
            <span>[Tool_4]</span>
            <span>[Tool_5]</span>
            <span>[Tool_6]</span>
            <span>[Tool_7]</span>
        </div>
    );
}

export default ToolBar;