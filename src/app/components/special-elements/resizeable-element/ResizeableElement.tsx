import React, {ReactNode} from "react";
import {BlockType} from "../../../OurTypes";
import styles from "./ResizeableElement.module.css";
import {ReactComponent as resizeIcon} from "../../../images/resize.svg";
import {ReactComponent as rotateIcon} from "../../../images/rotate.svg";
import {SvgIcon} from "@mui/material";

function ResizeableElement(content: { element: ReactNode, elementContext: BlockType, onTransformEnd: () => void, transformUpdateFunc: (angle: number, width: number, height: number) => void, positionUpdateFunc: (x: number, y: number) => void }) {
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

    function onMouseDown(mouseEvent: React.MouseEvent<SVGSVGElement>, cornerNumber: number) {
        isTaken = true;
        dragStartX = mouseEvent.clientX;
        dragStartY = mouseEvent.clientY;

        startPositionX = content.elementContext.content.position.x;
        startPositionY = content.elementContext.content.position.y;

        const nativeElement = mouseEvent.currentTarget.parentElement?.querySelector("img, span, svg");
        const poses = nativeElement?.getBoundingClientRect()!;

        figureCenterPositionX = poses.left + poses.width / 2;
        figureCenterPositionY = poses.top + poses.height / 2;

        startWidth = content.elementContext.content.width;
        startHeight = content.elementContext.content.height;
        startDegree = content.elementContext.content.position.angle;

        document.addEventListener("mouseup", (event) => onMouseUp(event, cornerNumber) );
        document.addEventListener("mousemove", (event) => onMouseMove(event, cornerNumber) );
    }

    function onMouseMove(mouseEvent: MouseEvent, cornerNumber: number) {
        mouseEvent.preventDefault();
        if (!isTaken) return;

        const newX = 0 - dragStartX + mouseEvent.clientX;
        const newY = 0 - dragStartY + mouseEvent.clientY;

        switch (cornerNumber) {
            case 1:
                content.positionUpdateFunc( startPositionX + newX,  startPositionY + newY);
                content.transformUpdateFunc(startDegree, startWidth - newX, startHeight - newY);
                break;
            case 2:
                content.positionUpdateFunc( startPositionX,  startPositionY + newY);
                content.transformUpdateFunc(startDegree, startWidth + newX, startHeight - newY);
                break;
            case 3:
                content.positionUpdateFunc( startPositionX + newX,  startPositionY);
                content.transformUpdateFunc(startDegree, startWidth - newX, startHeight + newY);
                break;
            case 4:
                content.transformUpdateFunc(startDegree, startWidth + newX, startHeight + newY);
                break;
            case 5:
                const radians = Math.atan2(mouseEvent.clientX - figureCenterPositionX, mouseEvent.clientY - figureCenterPositionY);
                const degrees = (radians * (180 / Math.PI) * -1) + 180;
                content.transformUpdateFunc(degrees, startWidth, startHeight);
                break;
            default:
        }
    }

    function onMouseUp(mouseEvent: MouseEvent, cornerNumber: number) {
        if (!isTaken) return;
        isTaken = false;
        document.removeEventListener("mouseup", (event) => onMouseUp(event, cornerNumber) );
        document.removeEventListener("mousemove", (event) => onMouseMove(event, cornerNumber) );

        content.onTransformEnd();
    }

    let contentElement: any = content.element;

    if (content.elementContext.isSelected) {
        contentElement = <div className={styles.transformBlock}>
            {content.element}
            <SvgIcon className={styles.topLeftPoint + " " + styles.Point}
                     onMouseDown={(event) => onMouseDown(event, 1)}
                     component={resizeIcon}/>
            <SvgIcon className={styles.topRightPoint + " " + styles.Point}
                     onMouseDown={(event) => onMouseDown(event, 2)}
                     component={resizeIcon}/>
            <SvgIcon className={styles.bottomLeftPoint + " " + styles.Point}
                     onMouseDown={(event) => onMouseDown(event, 3)}
                     component={resizeIcon}/>
            <SvgIcon className={styles.bottomRightPoint + " " + styles.Point}
                     onMouseDown={(event) => onMouseDown(event, 4)}
                     component={resizeIcon}/>
            <SvgIcon className={styles.middleRotate}
                     onMouseDown={(event) => onMouseDown(event, 5)}
                     component={rotateIcon} inheritViewBox={true}/>
        </div>
    }

    return (
        <div className={styles.block} style={style}>
            {contentElement}
        </div>
    )
}

export default ResizeableElement