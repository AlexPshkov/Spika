export type BlockType = {
    id: number,
    isSelected: boolean,
    content: TextType | PictureType | PrimitiveType
};

export type BlockPositionType = {
    x: number,
    y: number,
    angle: number
}

export type SlideType = {
    id: number,
    blocks: BlockType[],
    background: string,
    resolution: Resolution,
    isSelected: boolean
};

export type Resolution = {
    width: number;
    height: number;
}

export type PresentationType = {
    name: string,
    slides: SlideType[],
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
    style: "triangle" | "rectangle" | "ellipse",
    width: number,
    height: number,
    backgroundColor: string,
    borderColor: string,
    borderSize: number,
    position: BlockPositionType
};