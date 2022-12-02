import {PrimitiveType} from "../../../../OurTypes";
import styles from "../Primitive.module.css";

function Triangle( { width, height, backgroundColor, borderColor, borderSize, position }: PrimitiveType ) {
    const style = {
        left: position.point.x,
        top: position.point.y,
        width: width,
        height: height,
        transform: `rotate(${position.angle.degrees}deg)`
    }

    return (
        <svg style={style}
             className={styles.primitive}>
            <polygon points={borderSize + "," + (height - borderSize) + " " + width / 2 + "," + borderSize + " " + (width - borderSize) + "," + (height - borderSize)}
                     stroke={borderColor}
                     fill={backgroundColor}
                     strokeWidth={borderSize}/>
        </svg>)
}

export default Triangle;