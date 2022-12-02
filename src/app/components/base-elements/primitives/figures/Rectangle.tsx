import {PrimitiveType} from "../../../../OurTypes";
import styles from "../Primitive.module.css"

function Rectangle( { width, height, backgroundColor, borderColor, borderSize, position }: PrimitiveType ) {
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
            <rect x={borderSize}
                  y={borderSize}
                  width={width - borderSize * 2}
                  height={height - borderSize * 2}
                  stroke={borderColor}
                  fill={backgroundColor}
                  strokeWidth={borderSize}/>
        </svg>)
}

export default Rectangle;