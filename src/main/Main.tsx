import styles from "./Main.module.css"
import {SvgIcon} from "@mui/material";
import {ReactComponent as logo} from "./images/logo.svg"
import {ReactComponent as plusIcon} from "./images/plus.svg"
import {ReactComponent as uploadIcon} from "./images/upload.svg"
import {convertJSONToState} from "../app/utils/file-work/json-work/JsonWork";

function Main() {

    async function uploadPresentation(){
        const presentation = await convertJSONToState()

        console.warn(presentation)
    }


    return (
        <div className={styles.Main}>
            <header className="Main-header"/>
            <div className={styles.content}>
                <SvgIcon className={styles.logo} component={logo} inheritViewBox={true}/>
                <div className={styles.buttons}>
                    <button>
                        <SvgIcon component={plusIcon} inheritViewBox={true}/>
                        <span>Создать новую презентацию</span>
                    </button>
                    <button onClick={uploadPresentation}>
                        <SvgIcon component={uploadIcon} inheritViewBox={true}/>
                        <span>Загрузить презентацию</span>
                    </button>
                </div>
            </div>

        </div>
    )

}

export default Main;