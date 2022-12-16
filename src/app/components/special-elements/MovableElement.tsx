import React, {ReactNode} from "react";
import {BlockPositionType} from "../../OurTypes";


function MovableElement(content: { element: ReactNode, elementPosition: BlockPositionType, positionUpdateFunc: (x: number, y: number) => void }) {
    let isTaken: boolean = false;
    let dragStartX: number = 0;
    let dragStartY: number = 0;

    const startPositionX: number = content.elementPosition.point.x;
    const startPositionY: number = content.elementPosition.point.y;

    function onMouseDownHandler(mouseEvent: React.MouseEvent<HTMLDivElement>) {
        isTaken = true;
        dragStartX = mouseEvent.clientX;
        dragStartY = mouseEvent.clientY;

        document.addEventListener("mousemove", (event) => onMouseMoveHandler(event) );
        document.addEventListener("mouseup", (event) => onMouseUpHandler(event) );
    }


    function onMouseUpHandler(mouseEvent: MouseEvent) {
        if (!isTaken) return;

        isTaken = false;
        dragStartX = 0;
        dragStartY = 0;

        document.removeEventListener("mousemove", (event) => onMouseMoveHandler(event) );
        document.removeEventListener("mouseup", (event) => onMouseUpHandler(event) );
    }

    function onMouseMoveHandler(mouseEvent: MouseEvent) {
        if (!isTaken) return;

        const newX = startPositionX - dragStartX + mouseEvent.clientX;
        const newY = startPositionY - dragStartY + mouseEvent.clientY;

        content.positionUpdateFunc(newX, newY);
    }

    return (
        <div onDragStart={(event) => event.preventDefault()}
             onMouseDown={(event) => onMouseDownHandler(event)}>
            {content.element}
        </div>
    )
}

export default MovableElement