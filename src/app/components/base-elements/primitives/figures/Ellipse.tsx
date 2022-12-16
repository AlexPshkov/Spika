import {PrimitiveType} from "../../../../OurTypes";
import styles from "../Primitive.module.css";

function Ellipse( content: { primitive: PrimitiveType } ) {
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
            <ellipse cx={primitive.width / 2}
                     cy={primitive.height / 2}
                     rx={primitive.width / 2 - primitive.borderSize}
                     ry={primitive.height / 2 - primitive.borderSize}
                     stroke={primitive.borderColor}
                     fill={primitive.backgroundColor}
                     strokeWidth={primitive.borderSize}/>
        </svg>)
}

export default Ellipse;