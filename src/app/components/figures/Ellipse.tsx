import {PrimitiveType} from "../../OurTypes";

type EllipseFigure = {
    figure: PrimitiveType
}

export const Ellipse = (props: EllipseFigure) => {
    return (
        <svg width={props.figure.width} height={props.figure.height}>
            <ellipse
                cx={props.figure.width / 2}
                cy={props.figure.height / 2}
                rx={props.figure.width / 2 - props.figure.borderSize}
                ry={props.figure.height / 2 - props.figure.borderSize}
                stroke={props.figure.borderColor}
                fill={props.figure.backgroundColor}
                strokeWidth={props.figure.borderSize}
            />
        </svg>
    )
}