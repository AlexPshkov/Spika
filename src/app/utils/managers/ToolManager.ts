import {BlockType, SlideType} from "../../OurTypes";


export class ToolManager{


    private static GetMaxBlockId( blocks: BlockType[] ) {
        let MaxBlockId = 0;
        blocks.forEach(x => {
            if (x.id > MaxBlockId) MaxBlockId = x.id
        })
        return MaxBlockId
    }

    static CreateFigure( slide: SlideType ) {
        const Block: BlockType = {
            id: ToolManager.GetMaxBlockId( slide.blocks ),
            isSelected: true,
            content: {
                type: "primitive",
                content: {
                    type: "rectangle"
                },
                width: 50,
                height: 50,
                backgroundColor: "white",
                borderColor: "black",
                borderSize: 2,
                position: {
                    point: {
                        x: 50,
                        y: 50
                    },
                    angle: {
                        degrees: 0
                    }
                }
            }
        }

        slide.blocks.push(Block)
    }

    static CreateText( slide: SlideType ) {
            const Block: BlockType = {
            id: ToolManager.GetMaxBlockId( slide.blocks ),
            isSelected: true,
            content: {
                type: "text",
                symbols: "Text here",
                width: 100,
                height: 100,
                fontFamily: "",
                fontColor: "black",
                fontSize: 14,
                position: {
                    point: {
                        x: 50,
                        y: 50
                    },
                    angle: {
                        degrees: 0
                    }
                }
            }
        }

        slide.blocks.push(Block)
    }

    static CreateImage( slide: SlideType ) {
        const Block: BlockType = {
            id: ToolManager.GetMaxBlockId( slide.blocks ),
            isSelected: true,
            content: {
                type: "picture",
                url: "https://demotivation.ru/wp-content/uploads/2021/06/5-27.jpg",
                width: 100,
                height: 100,
                position: {
                    point: {
                        x: 50,
                        y: 50
                    },
                    angle: {
                        degrees: 0
                    }
                }
            }
        }

        slide.blocks.push(Block)
    }


}