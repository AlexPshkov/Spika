import {TextType} from "../../../OurTypes";
import styles from "./Text.module.css";

function Text( content: { text: TextType } ) {
    const text = content.text;

    const style = {
        // left: text.position.point.x,
        // top: text.position.point.y,
        width: text.width,
        height: text.height,
        // transform: `rotate(${text.position.angle.degrees}deg)`,
        "fontSize": text.fontSize,
        "fontFamily": text.fontFamily,
        color: text.fontColor,
    };

    return (
        <span className={styles.text} style={style}>
            {text.symbols}
        </span>);
}

export default Text;