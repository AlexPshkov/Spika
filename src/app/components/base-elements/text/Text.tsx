import {TextType} from "../../../OurTypes";
import styles from "./Text.module.css";

function Text({fontFamily, fontColor, fontSize, height, width, symbols, position}: TextType ) {
    const style = {
        left: position.point.x,
        top: position.point.y,
        width: width,
        height: height,
        angle: position.angle,
        "font-size": fontSize,
        "font-family": fontFamily,
        color: fontColor,
    };

    return (
        <span className={styles.text} style={style}>
            {symbols}
        </span>);
}

export default Text;