import {PictureType} from "../../../OurTypes";
import styles from "./Picture.module.css";

function Picture( { url, height, width, position }: PictureType ) {
    const style = {
        left: position.point.x,
        top: position.point.y,
        width: width,
        height: height,
        angle: position.angle
    };

    return (
        <img src={url}
             style={style}
             className={styles.picture}
             alt={""}>
        </img>);
}

export default Picture;