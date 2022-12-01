/*---------------------------------------------------------FUNCTIONS--------------------------------------------------*/
/*--------------------------------------------Presentation-functions--------------------------------------------------*/
function createPresentation():  Presentation {
    return {
        name: "Новая презентация",
        slides: [],
        selected: [],
        slideResolution: HDResolution
    }
}

function  savePresentation(presentation: Presentation): Presentation {
    return presentation;
}

function openPresentation(presentation: Presentation): Presentation {
    return presentation;
}

function renamePresentation(presentation: Presentation, newName: string): Presentation {
    return {
        ...presentation,
        name: newName
    };
}

function editPresentationSlidesResolution(presentation: Presentation, newResolution: Resolution): Presentation {
    return {
        ...presentation,
        slideResolution: newResolution
    };
}

/*--------------------------------------------Slide-functions---------------------------------------------------------*/
function createSlide(presentation: Presentation, slideID: number): Presentation {
    const newSlide: Slide = {
        blocks: [],
        slideID: Date.now(),
        selectedBlocks: [],
        background: defaultColor
    };
    const newSlides = [...presentation.slides, newSlide];
    return {
        ...presentation,
        slides: newSlides
    };
}

function deleteSlide(presentation: Presentation, slideID: number): Presentation {
    const slides = presentation.slides;
    const newSlides = [];
    for (let i = 0; i < slides.length; i++) {
        if (slides[i].slideID != slideID) {
            if (slides[i].slideID< slideID) {
                newSlides.push(slides[i]);
            } else {
                slides[i].slideID--;
                newSlides.push(slides[i]);
            }
        }
    }
    return {
        ...presentation,
        slides: newSlides
    };
}

function deleteSlides(presentation: Presentation, slideIDs: []): Presentation {
    slideIDs.forEach((iter) => {
        deleteSlide(presentation, iter);
    });

    return presentation;
}

function  editSlideBackground(presentation: Presentation, slideID: number, newBackground: Color | PictureBackground): Presentation {
    const slide = presentation.slides[slideID];
    const newSlide: Slide = {
        ...slide,
        background: newBackground
    };
    return {
        ...presentation,
        slides: presentation.slides.map((currentSlide) => {
            return (currentSlide.slideID === slideID) ? newSlide : currentSlide;
        })
    }
}

function selectSlide(presentation: Presentation, slideID: number): Presentation {
    const slide = presentation.slides[slideID];
    const newSelectedSlides = [...presentation.selected, slide.slideID];
    return {
        ...presentation,
        selected: newSelectedSlides
    };
}

function moveSlide(presentation: Presentation, prevID: number, currID: number): Presentation {
    const  slide = {
        ...presentation.slides[prevID]
    }
    const  newPositionOfSlide = {
        ...slide,
        slideID: currID
    }
    const newSlides = [];
    const slides = presentation.slides;
    for (let i = 0; i < presentation.slides.length; i++) {
        if (slides[i].slideID < currID) {
            newSlides.push(slides[i]);
        } else {
            if (slides[i].slideID == currID) {
                newSlides.push(newPositionOfSlide);
            }
            slides[i].slideID++;
            newSlides.push(slides[i]);
        }
    }
    return {
        ...presentation,
        slides: newSlides
    };
}


/*--------------------------------------------Block-functions---------------------------------------------------------*/
function createBlock(presentation: Presentation, slideID: number, newContent: BlockContent): Presentation {
    const newBlock = {
        content: newContent,
        blockID: Date.now(),
        position: {
            x: 1,
            y: 1
        },
        width: 50,
        height: 50
    }
    const newBlocks = [...presentation.slides[slideID].blocks, newBlock];
    const newSlide = {
        ...presentation.slides[slideID],
        blockList: newBlocks
    }
    return {
        ...presentation,
        slides: presentation.slides.map(( currSlide) => {
            return (currSlide.slideID == slideID) ? newSlide : currSlide;
        })
    };
}

function deleteBlock(presentation: Presentation, blockID: number, slideID: number): Presentation {
    return {
        ...presentation,
        slides: presentation.slides.map(slide => {
            if (slide.slideID === slideID) {
                return {
                    ...slide,
                    blocks: slide.blocks.filter(block => block.blockID !== blockID),
                }
            }
            return slide
        })
    }
}

function selectBlock(presentation: Presentation, slideID: number, blockID: number): Presentation {
    const newSelectedBlock = presentation.slides[slideID].blocks[blockID].blockID;
    const newSelectedBlocks = [...presentation.slides[slideID].selectedBlocks, newSelectedBlock];
    const newSlide = {
        ...presentation.slides[slideID],
        selectedBlocks: newSelectedBlocks
    }
    return {
        ...presentation,
        slides: presentation.slides.map(( currentSlide) => {
            return (currentSlide.slideID == slideID) ? newSlide : currentSlide;
        })
    };
}

function moveBlock(presentation: Presentation, slideID: number, blockID: number, newPositionX: number, newPositionY: number ): Presentation {
    const slide = presentation.slides[slideID];
    const block = slide.blocks[blockID];
    const newBlock = {
        ...block,
        position: {
            x: newPositionX,
            y: newPositionY
        }
    }
    const newSlide = {
        ...slide,
        blocks: slide.blocks.map(( currBlock) => {
            return (currBlock.blockID == blockID) ? newBlock : currBlock;
        })};
    return {
        ...presentation,
        slides: presentation.slides.map(( currSlide) => {
            return (currSlide.slideID == slideID) ? newSlide : currSlide;
        })
    };
}

function editBlockSize(presentation: Presentation, slideID: number, blockID: number, newWidth: number, newHeight: number): Presentation {
    const slide = presentation.slides[slideID];
    const block = slide.blocks[blockID];
    const newBlock = {
        ...block,
        width: newWidth,
        height: newHeight
    }
    const newSlide = {
        ...slide,
        blockList: slide.blocks.map(( currBlock) => {
            return (currBlock.blockID == blockID) ? newBlock : currBlock;
        })};
    return {
        ...presentation,
        slides: presentation.slides.map(( currSlide) => {
            return (currSlide.slideID == slideID) ? newSlide : currSlide;
        })
    };
}

/*--------------------------------------------Block-functions---------------------------------------------------------*/
function editFontFamily(presentation: Presentation, slideID: number, blockID: number, newFontFamily: string): Presentation {
    const slide = presentation.slides[slideID];
    const block = slide.blocks[blockID];
    const newBlock = {
        ...block,
        fontFamily: newFontFamily
    };
    const newSlide = {
        ...slide,
        blockList: slide.blocks.map(( currBlock) => {
            return (currBlock.blockID == blockID) ? newBlock : currBlock;
        })};
    return {
        ...presentation,
        slides: presentation.slides.map(( currSlide) => {
            return (currSlide.slideID == slideID) ? newSlide : currSlide;
        })
    };
}

function editFontSize(presentation: Presentation, slideID: number, blockID: number, newFontSize: string): Presentation {
    const slide = presentation.slides[slideID];
    const block = slide.blocks[blockID];
    const newBlock = {
        ...block,
        fontSize: newFontSize
    };
    const newSlide = {
        ...slide,
        blockList: slide.blocks.map(( currBlock) => {
            return (currBlock.blockID == blockID) ? newBlock : currBlock;
        })};
    return {
        ...presentation,
        slides: presentation.slides.map(( currSlide) => {
            return (currSlide.slideID == slideID) ? newSlide : currSlide;
        })
    };
}

function editFontColor(presentation: Presentation, slideID: number, blockID: number, newFontColor: string): Presentation {
    const slide = presentation.slides[slideID];
    const block = slide.blocks[blockID];
    const newBlock = {
        ...block,
        fontColor: newFontColor
    };
    const newSlide = {
        ...slide,
        blockList: slide.blocks.map(( currBlock) => {
            return (currBlock.blockID == blockID) ? newBlock : currBlock;
        })};
    return {
        ...presentation,
        slides: presentation.slides.map(( currSlide) => {
            return (currSlide.slideID == slideID) ? newSlide : currSlide;
        })
    };
}

// 3:22 UTC+3 25.11.2022. Я хочу спать... (пасхалка?)

function editTextSymbols(presentation: Presentation, slideID: number, blockID: number, newSymbols: string): Presentation {
    const slide = presentation.slides[slideID];
    const block = slide.blocks[blockID];
    const newBlock = {
        ...block,
        symbols: newSymbols
    };
    const newSlide = {
        ...slide,
        blockList: slide.blocks.map(( currBlock) => {
            return (currBlock.blockID == blockID) ? newBlock : currBlock;
        })};
    return {
        ...presentation,
        slides: presentation.slides.map(( currSlide) => {
            return (currSlide.slideID == slideID) ? newSlide : currSlide;
        })
    };
}

function editPrimitiveBackground(presentation: Presentation, slideID: number, blockID: number, newPrimitiveBackground: string): Presentation {
    const slide = presentation.slides[slideID];
    const block = slide.blocks[blockID];
    const newBlock = {
        ...block,
        background: newPrimitiveBackground
    };
    const newSlide = {
        ...slide,
        blockList: slide.blocks.map(( currBlock) => {
            return (currBlock.blockID == blockID) ? newBlock : currBlock;
        })};
    return {
        ...presentation,
        slides: presentation.slides.map(( currSlide) => {
            return (currSlide.slideID == slideID) ? newSlide : currSlide;
        })
    };
}

function editPrimitiveBorder(presentation: Presentation, slideID: number, blockID: number, newPrimitiveBorder: string): Presentation {
    const slide = presentation.slides[slideID];
    const block = slide.blocks[blockID];
    const newBlock = {
        ...block,
        border: newPrimitiveBorder
    };
    const newSlide = {
        ...slide,
        block: slide.blocks.map( currBlock => (currBlock.blockID == blockID) ? newBlock : currBlock )
    };
    return {
        ...presentation,
        slides: presentation.slides.map(( currSlide) => {
            return (currSlide.slideID == slideID) ? newSlide : currSlide;
        })
    };
}

/*-----------------------------------------------------TYPES----------------------------------------------------------*/
type Presentation = {
    name: string;
    slides: Slide[];
    selected: number[];
    slideResolution: Resolution;
}

type Resolution = {
    content: Big | Small;
}

type Big = {
    type: 'Big';
    width: number;
    height: number;
}

type Small  = {
    type: 'Small';
    width: number;
    height: number;
}

type Slide = {
    blocks: Block[];
    selectedBlocks: number[];
    background: Color | PictureBackground;
    slideID: number;
}

type Color = {
    pattern: string;
}

type PictureBackground = {
    link: string;
    resolution: Big | Small;
}

type Block = {
    blockID: number;
    content: BlockContent;
    position: {
        x: number, y: number
    };
    width: number;
    height: number;
}

type BlockContent = {
    data: Primitive | Picture | Tekst;
}

type Primitive = {
    type: 'Primitive';
    content: Triangle | Rectangle | Ellipse;
    borderColor: Color;
    borderSize: number;
    backgroundColor: Color;
}

type Triangle = {
    type: 'Triangle';
}

type Rectangle = {
    type: 'Rectangle';
}

type Ellipse = {
    type: 'Ellipse';
    radius: number;
}

type Picture = {
    type: 'Picture';
    link: string;
}

type Tekst = {
    type: 'Tekst',
    fontFamily: string;
    fontColor: Color;
    fontsize: number;
    symbols: string;
}

/*-------------------------------------------CONSTANTS----------------------------------------------------------------*/

const  bigResolution: Big = {
    type: 'Big',
    width: 1920,
    height: 1080
};

const  smallResolution: Small = {
    type: 'Small',
    width: 1920,
    height: 1080
}

const  defaultColor: Color = {
    pattern: '#FFFFFF'
}

const FullHDResolution: Resolution = {
    content: bigResolution
}

const HDResolution: Resolution = {
    content: smallResolution
}

/*-------------------------------------------EXPORT----------------------------------------------------------------*/

export  {
    type Presentation,
    type Slide,
    type Block,
    type BlockContent,
    type Tekst,
    type Primitive,
    type Rectangle,
    type Triangle,
    type Ellipse,
    type Resolution,
    type Big,
    type Small
}