import {PrimitiveType} from "../../../../OurTypes";
import styles from "../Primitive.module.css";

function Rectangle( content: { primitive: PrimitiveType } ) {
    const primitive: PrimitiveType = content.primitive;

    const style = {
        left: primitive.position.point.x,
        top: primitive.position.point.y,
        width: primitive.width,
        height: primitive.height,
        transform: `rotate(${primitive.position.angle.degrees}deg)`
    }

    return (
        <svg style={style}
             className={styles.primitive}>
            <rect x={primitive.borderSize}
                  y={primitive.borderSize}
                  width={primitive.width - primitive.borderSize * 2}
                  height={primitive.height - primitive.borderSize * 2}
                  stroke={primitive.borderColor}
                  fill={primitive.backgroundColor}
                  strokeWidth={primitive.borderSize}/>
        </svg>)
}

export default Rectangle;