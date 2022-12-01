import {Primitive, Block} from '../../types-and-functions';

type EllipseFigure = {
    block: Block,
    figure: Primitive
}

const Ellipse = (props: EllipseFigure) => {
    return (
        <svg width={props.block.width} height={props.block.height}>
            <ellipse
                cx={props.block.width / 2}
                cy={props.block.height / 2}
                rx={props.block.width / 2 - props.figure.borderSize}
                ry={props.block.height / 2 - props.figure.borderSize}
                stroke={props.figure.borderColor.pattern}
                fill={props.figure.backgroundColor.pattern}
                strokeWidth={props.figure.borderSize}
            />
        </svg>
    )
}

export {
    Ellipse
}