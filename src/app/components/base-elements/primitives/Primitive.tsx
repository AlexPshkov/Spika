import {PrimitiveType} from "../../../OurTypes";
import Triangle from "./figures/Triangle";
import Rectangle from "./figures/Rectangle";
import Ellipse from "./figures/Ellipse";

function Primitive( content: { primitive: PrimitiveType } ) {
    const primitiveType: PrimitiveType = content.primitive;

    switch (primitiveType.style) {
        case "triangle":
            return <Triangle primitive={primitiveType} />
        case "rectangle":
            return <Rectangle primitive={primitiveType}/>
        case "ellipse":
            return <Ellipse primitive={primitiveType} />
        default:
            return <span>Default span</span>
    }
}

export default Primitive;