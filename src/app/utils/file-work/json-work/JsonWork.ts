import {PresentationType} from "../../../OurTypes";


export function convertStateToJSON(presentation: PresentationType) {
    const json = JSON.stringify(presentation)
    const blob = new Blob([json], {type: "text/plain"})
    const title = presentation.name.length > 0 ? presentation.name : "Presentation"
    const fileName = title + ".spika"

    const link = document.createElement("a")
    link.setAttribute("href", URL.createObjectURL(blob))
    link.setAttribute("download", fileName)
    link.click()
}

function getUserFile(fileInput: HTMLInputElement): Promise<File> {
    fileInput.click()
    return new Promise<File>(function (resolve) {
        fileInput.addEventListener("change", () => {
            resolve(fileInput.files?.[0] as File)
        })
    })
}

export async function convertJSONToState(): Promise<PresentationType> {
    // let presentation: PresentationType/* | null = null*/ = {name: "name", slides: [], currentSlideId: -1}
    const fileInput = document.createElement("input")
    fileInput.type = "file"
    fileInput.accept = '.spika'

    const file = await getUserFile(fileInput);
    const text = await file.text();

    return JSON.parse(text);
}

