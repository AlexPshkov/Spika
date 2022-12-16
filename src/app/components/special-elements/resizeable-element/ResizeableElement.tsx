import React, {ReactNode} from "react";
import {BlockPositionType, PictureType, PrimitiveType, TextType} from "../../../OurTypes";
import styles from "./ResizeableElement.module.css";


function ResizeableElement(content: { element: ReactNode, elementContext: TextType | PrimitiveType | PictureType, transformUpdateFunc: (angle: number, width: number, height: number) => void }) {
    let isTaken: boolean = false;
    let dragStartX: number = 0;
    let dragStartY: number = 0;

    const startPositionX: number = 0;
    const startPositionY: number = 0;

    const style = {
        left: content.elementContext.position.point.x,
        top: content.elementContext.position.point.y,
        width: content.elementContext.width,
        height: content.elementContext.height,
        transform: `rotate(${content.elementContext.position.angle.degrees}deg)`
    };

    function onMouseDownHandler(mouseEvent: React.MouseEvent<HTMLDivElement>) {
        // isTaken = true;
        // dragStartX = mouseEvent.clientX;
        // dragStartY = mouseEvent.clientY;
        //
        // document.addEventListener("mousemove", (event) => onMouseMoveHandler(event) );
        // document.addEventListener("mouseup", (event) => onMouseUpHandler(event) );
    }


    function onMouseUpHandler(mouseEvent: MouseEvent) {
        // if (!isTaken) return;
        //
        // isTaken = false;
        // dragStartX = 0;
        // dragStartY = 0;
        //
        // document.removeEventListener("mousemove", (event) => onMouseMoveHandler(event) );
        // document.removeEventListener("mouseup", (event) => onMouseUpHandler(event) );
    }

    function onMouseMoveHandler(mouseEvent: MouseEvent) {
        if (!isTaken) return;

        const newX = startPositionX - dragStartX + mouseEvent.clientX;
        const newY = startPositionY - dragStartY + mouseEvent.clientY;

        // content.positionUpdateFunc(newX, newY);
    }

    return (
        <div className={styles.block} style={style} onMouseDown={(event) => onMouseDownHandler(event)}>
            <div className={styles.transformBlock}>
                <div className={styles.topLeftPoint}></div>
                <div className={styles.topRightPoint}></div>
                <div className={styles.middleRotate}></div>
                {content.element}
                <div className={styles.bottomLeftPoint}></div>
                <div className={styles.bottomRightPoint}></div>
            </div>
        </div>
    )
}

export default ResizeableElement