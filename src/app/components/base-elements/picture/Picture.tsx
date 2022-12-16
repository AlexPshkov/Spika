import {PictureType} from "../../../OurTypes";
import styles from "./Picture.module.css";

function Picture( content: { picture: PictureType } ) {
    const picture: PictureType = content.picture;

    const style = {
        width: "100%",
        height: "100%",
        // left: picture.position.point.x,
        // top: picture.position.point.y,
        // width: picture.width,
        // height: picture.height,
        // transform: `rotate(${picture.position.angle.degrees}deg)`
    };

    return (
        <img src={picture.url}
             style={style}
             className={styles.picture}
             alt={""}>
        </img>);
}

export default Picture;