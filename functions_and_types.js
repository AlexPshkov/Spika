function createPresentation(Presentation, name) {
    return presentation;
}

function savePresentation(Presentation) {
    return presentation;
}

function openPresentation(Presentation, file) {
    return presentation;
}

function renamePresentation(Presentation, name) {
    return presentation;
}

function createSlide(Presentation) {
    return presentation;
}

function removeSlide(Presentation) {
    return presentation;
}

function removeSlides(Presentation) {
    return presentation;
}

function editBackground(Presentation, background) {
    return presentation;
}

function editResolution(Presentation, resolution) {
    return presentation;
}

function selectSlide(Presentation, SlideId) {
    return presentation;
}

function moveSlide(Presentation, position) {
    return presentation;
}

function copyBlock(Presentation, Block) {
    return presentation;
}

function insertBlock(Presentation, Block) {
    return presentation;
}

function createBlock(Presentation, data) {
    return presentation;
}

function removeBlock(Presentation, Block) {
    return presentation;
}

function selectBlock(Presentation, BlockId) {
    return presentation;
}

function moveBlock(Presentation, Block) {
    return presentation;
}

function editBlockSize(Presentation, Block, width, height) {
    return presentation;
}

function editFontFamily(Presentation, Block, fontFamily) {
    return presentation;
}

function editFontSize(Presentation, Block, Size) {
    return presentation;
}

function editFontColor(Presentation, Block, Color) {
    return presentation;
}

function editTextSymbols(Presentation, Block, Symbols) {
    return presentation;
}

function editPrimitiveBackground(Presentation, Block, color) {
    return presentation;
}

function editPrimitiveBorderPresentation(Presentation, Block, color) {
    return presentation;
}

const block1 = {
    id: '1',
    content: text,
    point: {
        x: 280,
        y: 110
    },
    angle: {
        degrees: 34
    }
};
const block2 = {
    id: 2,
    content: picture,
    point: {
        x: 600,
        y: 800
    },
    angle: {
        degrees: 26.5
    }
};
const block3 = {
    id: 23,
    content: primitive,
    point: {
        x: 900,
        y: 1350
    },
    angle: {
        degrees: 45
    }
};
const slide1 = {
    id: 3,
    blocks: [block1, block2, block3],
    background: "white",
    selectedBlocks: []
};
const presentation = {
    name: "New presentation",
    slides: [slide1],
    resolution: "FullHD", //"HD"
    selection: {
        selectedSlides: []
    }
};
const text = {
    type: "text",
    fontFamily: "Times New Roman",
    fontColor: "black",
    fontSize: 14,
    height: 40,
    width: 50,
    symbols: "Russian",
};
const picture = {
    type: "picture",
    url: "C:\\Pictures\\Random_picture.png",
    width: 500,
    height: 300
};
const primitive = {
    content: triangle, //  "rectangle" | "circle",
    background: "blue",
    border: "black",
};
const triangle = {
    type: "triangle",
    height: 500,
    width: 300,
};
const rectangle = {
    type: "rectangle",
    height: 500,
    width: 300,
};
const circle = {
    type: "circle",
    radius: 200,
};