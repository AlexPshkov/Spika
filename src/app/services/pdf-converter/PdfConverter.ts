import {PresentationType} from "../../OurTypes";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


export class PdfConverter {
    public presentationVariants: string[] = [];
    public currentVersion: number = -1;

    public readonly presentationUpdateFunction: (presentation: PresentationType) => void;

    constructor(presentationUpdateFunction: (presentation: PresentationType) => void ) {
        this.presentationUpdateFunction = presentationUpdateFunction;
    }

    static async getPdf(presentation: PresentationType): Promise<void> {
        const doc = new jsPDF('l', 'px');

        doc.deletePage(1);

        for (let slide of presentation.slides) {
            const element: HTMLElement | null = document.querySelector(`#slide_${slide.id}`);
            if ( element == null ) {
                continue;
            }

            const canvas = await html2canvas(element);
            const slideImage: string = canvas.toDataURL("image/png");
            doc.addPage([slide.resolution.width, slide.resolution.height]);

            doc.addImage(slideImage, 'PNG', 0, 0, slide.resolution.width, slide.resolution.height);
        }

        doc.save(`${presentation.name}.pdf`);
    }
}
