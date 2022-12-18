import {BlockType, PresentationType, SlideType} from "../../OurTypes";


export class ToolManager{


    private static GetMaxId( elements: BlockType[] | SlideType[] ) {
        let MaxId = 0;
        elements.forEach(x => {
            if (x.id > MaxId) MaxId = x.id
        })
        return MaxId
    }

    static CreateFigure( slide: SlideType ) {
        const Block: BlockType = {
            id: ToolManager.GetMaxId( slide.blocks ),
            isSelected: true,
            content: {
                type: "primitive",
                style: "rectangle",
                width: 50,
                height: 50,
                backgroundColor: "white",
                borderColor: "black",
                borderSize: 2,
                position: {
                    x: 50,
                    y: 50,
                    angle: 0
                }
            }
        }

        slide.blocks.push(Block)
    }

    static CreateText( slide: SlideType ) {
            const Block: BlockType = {
            id: ToolManager.GetMaxId( slide.blocks ),
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
                    x: 50,
                    y: 50,
                    angle: 0
                }
            }
        }

        slide.blocks.push(Block)
    }

    static CreateImage( slide: SlideType ) {
        const Block: BlockType = {
            id: ToolManager.GetMaxId( slide.blocks ),
            isSelected: true,
            content: {
                type: "picture",
                url: "https://demotivation.ru/wp-content/uploads/2021/06/5-27.jpg",
                width: 100,
                height: 100,
                position: {
                    x: 50,
                    y: 50,
                    angle: 0
                }
            }
        }

        slide.blocks.push(Block)
    }

    static CreateSlide( presentation: PresentationType ) {
        const Slide: SlideType = {
            id: ToolManager.GetMaxId(presentation.slides),
            blocks: [],
            background: "white",
            resolution: {
                width: 1280,
                height: 720
            },
            isSelected: false,
            selectedBlocks: []
        }

        presentation.slides.push(Slide)
    }

}