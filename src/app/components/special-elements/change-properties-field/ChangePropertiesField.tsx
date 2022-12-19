import {BlockType} from "../../../OurTypes";


function ChangePropertiesField(content: { name: string, type: "number" | "string", value: string, elems: BlockType[], requireUpdate: () => void }) {
    function updateProperties( value: string) {
        content.elems.forEach(elem => {
            switch (content.name) {
                case "positionX":
                    elem.content.position.x = Number(value);
                    break;
                case "positionY":
                    elem.content.position.y = Number(value);
                    break;
                case "width":
                    elem.content.width = Number(value);
                    break;
                case "height":
                    elem.content.height = Number(value);
                    break;
                case "angle":
                    elem.content.position.angle = Number(value);
                    break;
            }
            switch (elem.content.type) {
                case "text":
                    switch (content.name) {
                        case "symbols":
                            elem.content.symbols = value;
                            break;
                        case "fontFamily":
                            elem.content.fontFamily = value;
                            break;
                        case "fontSize":
                            elem.content.fontSize = Number(value);
                            break;
                        case "fontColor":
                            elem.content.fontColor = value;
                            break;
                    }
                    break;
                case "picture":
                    elem.content.url = value;
                    break;
                case "primitive":
                    switch (content.name) {
                        case "backgroundColor":
                            elem.content.backgroundColor = value;
                            break;
                        case "borderSize":
                            elem.content.borderSize = Number(value);
                            break;
                        case "borderColor":
                            elem.content.borderColor = value;
                            break;
                    }
                    break;
            }
        })
        content.requireUpdate();
    }


    return <input name={content.name}
                  type={content.type}
                  value={content.value}
                  onChange={(event) => updateProperties( event.target.value )}/>
}

export default ChangePropertiesField;