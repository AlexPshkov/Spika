import React, {ReactNode} from "react";
import {BlockType} from "../../../OurTypes";
import styles from "./ResizeableElement.module.css";
import resizeIcon from "../../../images/resize.svg";
import rotateIcon from "../../../images/rotate.svg";


function ResizeableElement(content: { element: ReactNode, elementContext: BlockType, transformUpdateFunc: (angle: number, width: number, height: number) => void }) {
    let isTaken: boolean = false;
    let dragStartX: number = 0;
    let dragStartY: number = 0;

    let startPositionX: number = 0;
    let startPositionY: number = 0;

    let figureCenterPositionX: number = 0;
    let figureCenterPositionY: number = 0;

    let startWidth: number = 0;
    let startHeight: number = 0;
    let startDegree: number = 0;

    const style = {
        left: content.elementContext.content.position.x,
        top: content.elementContext.content.position.y,
        width: content.elementContext.content.width,
        height: content.elementContext.content.height,
        transform: `rotate(${content.elementContext.content.position.angle}deg)`
    };

    function onMouseDown(mouseEvent: React.MouseEvent<HTMLDivElement>, cornerNumber: number) {
        isTaken = true;
        dragStartX = mouseEvent.clientX;
        dragStartY = mouseEvent.clientY;

        startPositionX = 0;
        startPositionY = 0;

        const nativeElement = mouseEvent.currentTarget.parentElement?.querySelector("img, span, svg");
        const poses = nativeElement?.getBoundingClientRect()!;

        figureCenterPositionX = poses.left + poses.width / 2;
        figureCenterPositionY = poses.top + poses.height / 2;

        //TODO Удалить это
        moveCircleTo(figureCenterPositionX, figureCenterPositionY);

        startWidth = content.elementContext.content.width;
        startHeight = content.elementContext.content.height;
        startDegree = content.elementContext.content.position.angle;

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
                content.transformUpdateFunc(getNewDegree(mouseEvent.clientX, mouseEvent.clientY), startWidth, startHeight);
                break;
            default:
        }
    }

    function moveCircleTo(x: number, y: number) {
        let el = document.getElementById("redCircle")!;
        el.style.position = "absolute";
        el.style.left = x - 10 + "px";
        el.style.top = y - 10 + "px";
    }

    function getNewDegree( mouseX: number, mouseY: number ): number {
        // figureCenterPositionX - Центр фигуры по X
        // figureCenterPositionY - Центр фигуры по Y

        // mouseX - Позиция мыши по X
        // mouseY - Позиция мыши по Y
        return startDegree + mouseX * 0.5 + mouseY * 0.5;
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
            <img className={styles.topLeftPoint}
                 onMouseDown={(event) => onMouseDown(event, 1)}
                 src={resizeIcon} alt={""}/>
            <img className={styles.topRightPoint}
                 onMouseDown={(event) => onMouseDown(event, 2)}
                 src={resizeIcon} alt={""}/>
            <img className={styles.bottomLeftPoint}
                 onMouseDown={(event) => onMouseDown(event, 3)}
                 src={resizeIcon} alt={""}/>
            <img className={styles.bottomRightPoint}
                 onMouseDown={(event) => onMouseDown(event, 4)}
                 src={resizeIcon} alt={""}/>
            <img className={styles.middleRotate}
                 onMouseDown={(event) => onMouseDown(event, 5)}
                 src={rotateIcon} alt={""}/>
        </div>
    }

    return (
        <div className={styles.block} style={style}>
            {contentElement}
        </div>
    )
}

export default ResizeableElement