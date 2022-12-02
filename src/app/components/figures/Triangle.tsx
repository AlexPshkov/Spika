import {PrimitiveType} from "../../OurTypes";

type TriangleFigure = {
    figure: PrimitiveType
}

export const Triangle = (props: TriangleFigure) => {
    return (
        <svg width={props.figure.width} height={props.figure.height}>
            <polygon
                points={props.figure.borderSize + "," + (props.figure.height - props.figure.borderSize) + " " + props.figure.width / 2 + "," + props.figure.borderSize + " " + (props.figure.width - props.figure.borderSize) + "," + (props.figure.height - props.figure.borderSize)}
                stroke={props.figure.borderColor}
                fill={props.figure.backgroundColor}
                strokeWidth={props.figure.borderSize}
            />
        </svg>
    )
}