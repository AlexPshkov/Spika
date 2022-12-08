import {PresentationType, SlideType} from "../../OurTypes";
import styles from "./SlidesList.module.css";


function SlidesList( { slides }: PresentationType) {


    function AddSlide( slide: SlideType ) {
        const style = {
            backgroundColor: slide.background,
            aspectRatio: slide.resolution.width + " / " + slide.resolution.height,
            height: "100%"
        }

        return <div className={slide.isSelected ? styles.selectedSlide : ""} style={style}/>
    }

    return (
        <div className={styles.slidesList}>
            {slides.map(x => AddSlide(x))}
        </div>
    )
}

export default SlidesList