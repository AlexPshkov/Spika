export type BlockType = {
    id: string,
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
    }
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
    content: TriangleType | RectangleType | CircleType,
    background: string,
    border: string,
};

export type TriangleType = {
    type: "triangle",
    height: number,
    width: number,
};

export type RectangleType = {
    type: "rectangle",
    height: number,
    width: number,
};

export type CircleType = {
    type: "circle",
    radius: number,
};