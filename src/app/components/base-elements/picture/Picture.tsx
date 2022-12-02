import {PictureType} from "../../../OurTypes";
import styles from "./Picture.module.css";

function Picture( { url, height, width, position }: PictureType ) {
    const style = {
        left: position.point.x,
        top: position.point.y,
        width: width,
        height: height,
        transform: `rotate(${position.angle.degrees}deg)`
    };
    console.log(style);

    return (
        <img src={url}
             style={style}
             className={styles.picture}
             alt={""}>
        </img>);
}

export default Picture;