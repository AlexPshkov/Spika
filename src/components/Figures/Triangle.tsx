import {Primitive, Block} from '../../types-and-functions';

type TriangleFigure = {
    block: Block,
    figure: Primitive
}

const Triangle = (props: TriangleFigure) => {
    return (
        <svg width={props.block.width} height={props.block.height}>
            <polygon
                points={props.figure.borderSize + "," + (props.block.height - props.figure.borderSize) + " " + props.block.width/2 + "," + props.figure.borderSize + " " + (props.block.width - props.figure.borderSize) + "," + (props.block.height - props.figure.borderSize)}
                stroke={props.figure.borderColor.pattern}
                fill={props.figure.backgroundColor.pattern}
                strokeWidth={props.figure.borderSize}
            />
        </svg>
    )
}

export {
    Triangle
}