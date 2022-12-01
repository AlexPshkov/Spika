import {Primitive, Block} from '../../types-and-functions';

type RectangleFigure = {
    block: Block,
    figure: Primitive
}

const Rectangle = (props: RectangleFigure) => {
    return (
        <svg width={props.block.width} height={props.block.height}>
            <rect
                x={props.figure.borderSize}
                y={props.figure.borderSize}
                width={props.block.width - props.figure.borderSize * 2}
                height={props.block.height - props.figure.borderSize * 2}
                stroke={props.figure.borderColor.pattern}
                fill={props.figure.backgroundColor.pattern}
                strokeWidth={props.figure.borderSize}
            />
        </svg>
    )
}

export {
    Rectangle
}