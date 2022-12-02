import {PrimitiveType} from "../../OurTypes";

type RectangleFigure = {
    figure: PrimitiveType
}

export const Rectangle = (props: RectangleFigure) => {
    return (
        <svg width={props.figure.width} height={props.figure.height}>
            <rect
                x={props.figure.borderSize}
                y={props.figure.borderSize}
                width={props.figure.width - props.figure.borderSize * 2}
                height={props.figure.height - props.figure.borderSize * 2}
                stroke={props.figure.borderColor}
                fill={props.figure.backgroundColor}
                strokeWidth={props.figure.borderSize}
            />
        </svg>
    )
}