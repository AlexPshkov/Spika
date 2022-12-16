import styles from "./ToolBar.module.css";
import {PresentationType} from "../../OurTypes";

function ToolBar( { name, slides }: PresentationType) {
    return (
        <div className={styles.toolBar}>
            <div className={styles.tool} title={"Добавить текст на слайд"}><img src={""} alt={"Text"}/></div>
            <div className={styles.tool} title={"Добавить фигуру на слайд"}><img src={""} alt={"Figure"}/></div>
            <div className={styles.tool} title={"Добавить картинку на слайд"}><img src={""} alt={"Image"}/></div>
            <div className={styles.tool} title={"Создать новый слайд"}><img src={""} alt={"New slide"}/></div>
            <div className={styles.tool} title={"Сохранить или экспортировать презентацию"}><img src={""} alt={"Save/Export"}/></div>
        </div>
    );
}

export default ToolBar;