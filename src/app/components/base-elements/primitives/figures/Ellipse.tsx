import {PrimitiveType} from "../../../../OurTypes";
import styles from "../Primitive.module.css";

function Ellipse( { width, height, backgroundColor, borderColor, borderSize, position }: PrimitiveType ) {
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
            <ellipse cx={width / 2}
                     cy={height / 2}
                     rx={width / 2 - borderSize}
                     ry={height / 2 - borderSize}
                     stroke={borderColor}
                     fill={backgroundColor}
                     strokeWidth={borderSize}/>
        </svg>)
}

export default Ellipse;