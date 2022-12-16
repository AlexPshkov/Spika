import React, {ReactNode} from "react";
import {BlockType} from "../../../OurTypes";
import styles from "./ResizeableElement.module.css";


function ResizeableElement(content: { element: ReactNode, elementContext: BlockType, transformUpdateFunc: (angle: number, width: number, height: number) => void }) {
    let isTaken: boolean = false;
    let dragStartX: number = 0;
    let dragStartY: number = 0;

    let startPositionX: number = 0;
    let startPositionY: number = 0;

    let startWidth: number = 0;
    let startHeight: number = 0;
    let startDegree: number = 0;

    const style = {
        left: content.elementContext.content.position.point.x,
        top: content.elementContext.content.position.point.y,
        width: content.elementContext.content.width,
        height: content.elementContext.content.height,
        transform: `rotate(${content.elementContext.content.position.angle.degrees}deg)`
    };

    function onMouseDown(mouseEvent: React.MouseEvent<HTMLDivElement>, cornerNumber: number) {
        isTaken = true;
        dragStartX = mouseEvent.clientX;
        dragStartY = mouseEvent.clientY;

        startPositionX = 0;
        startPositionY = 0;

        startWidth = content.elementContext.content.width;
        startHeight = content.elementContext.content.height;
        startDegree = content.elementContext.content.position.angle.degrees;

        document.addEventListener("mouseup", (event) => onMouseUp(event, cornerNumber) );
        document.addEventListener("mousemove", (event) => onMouseMove(event, cornerNumber) );
    }

    function onMouseMove(mouseEvent: MouseEvent, cornerNumber: number) {
        mouseEvent.preventDefault();
        if (!isTaken) return;

        const newX = startPositionX - dragStartX + mouseEvent.clientX;
        const newY = startPositionY - dragStartY + mouseEvent.clientY;

        switch (cornerNumber) {
            case 1:
            case 2:
            case 3:
            case 4:
                content.transformUpdateFunc(startDegree, startWidth + newX, startHeight + newY);
                break;
            case 5:
                content.transformUpdateFunc(startDegree + newY * 0.5 + newX * 0.5, startWidth, startHeight);
                break;
            default:
        }
    }

    function onMouseUp(mouseEvent: MouseEvent, cornerNumber: number) {
        if (!isTaken) return;
        isTaken = false;
        document.removeEventListener("mouseup", (event) => onMouseUp(event, cornerNumber) );
        document.removeEventListener("mousemove", (event) => onMouseMove(event, cornerNumber) );
    }

    let contentElement: any = content.element;

    if (content.elementContext.isSelected) {
        contentElement = <div className={styles.transformBlock}>
            {content.element}
            <div className={styles.topLeftPoint}
                 onMouseDown={(event) => onMouseDown(event, 1)}/>
            <div className={styles.topRightPoint}
                 onMouseDown={(event) => onMouseDown(event, 2)}/>
            <div className={styles.bottomLeftPoint}
                 onMouseDown={(event) => onMouseDown(event, 3)}/>
            <div className={styles.bottomRightPoint}
                 onMouseDown={(event) => onMouseDown(event, 4)}/>
            <div className={styles.middleRotate}
                 onMouseDown={(event) => onMouseDown(event, 5)}/>
        </div>
    }

    return (
        <div className={styles.block} style={style}>
            {contentElement}
        </div>
    )
}

export default ResizeableElement