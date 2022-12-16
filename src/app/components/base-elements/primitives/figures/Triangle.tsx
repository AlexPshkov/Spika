import {PrimitiveType} from "../../../../OurTypes";
import styles from "../Primitive.module.css";

function Triangle( content: { primitive: PrimitiveType } ) {
    const primitive: PrimitiveType = content.primitive;

    const style = {
        // left: primitive.position.point.x,
        // top: primitive.position.point.y,
        width: "100%",
        height: "100%"
        // transform: `rotate(${primitive.position.angle.degrees}deg)`
    }

    return (
        <svg style={style}
             className={styles.primitive}>
            <polygon points={primitive.borderSize + "," + (primitive.height - primitive.borderSize) + " " + primitive.width / 2 + "," + primitive.borderSize + " " + (primitive.width - primitive.borderSize) + "," + (primitive.height - primitive.borderSize)}
                     stroke={primitive.borderColor}
                     fill={primitive.backgroundColor}
                     strokeWidth={primitive.borderSize}/>
        </svg>)
}

export default Triangle;