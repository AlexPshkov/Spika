export type BlockType = {
    id: number,
    isSelected: boolean,
    content: TextType | PictureType | PrimitiveType
};

export type BlockPositionType = {
    point: {
        x: number,
        y: number
    },
    angle: {
        degrees: number
    }
}

export type SlideType = {
    id: number,
    blocks: BlockType[],
    background: string,
    resolution: Resolution,
    isSelected: boolean,
    selectedBlocks: BlockType[]
};

export type Resolution = {
    width: number;
    height: number;
}

export type PresentationType = {
    name: string,
    slides: SlideType[],
    selection: {
        selectedSlides: SlideType[]
    },
    currentSlideId: number
};

export type TextType = {
    type: "text",
    fontFamily: string,
    fontColor: string,
    fontSize: number,
    height: number,
    width: number,
    symbols: string,
    position: BlockPositionType
};

export type PictureType = {
    type: "picture",
    url: string,
    width: number,
    height: number,
    position: BlockPositionType
};

export type PrimitiveType = {
    type: "primitive",
    content: TriangleType | RectangleType | EllipseType,
    width: number,
    height: number,
    backgroundColor: string,
    borderColor: string,
    borderSize: number,
    position: BlockPositionType
};

export type TriangleType = {
    type: "triangle"
};

export type RectangleType = {
    type: "rectangle"
};

export type EllipseType = {
    type: "ellipse"
};