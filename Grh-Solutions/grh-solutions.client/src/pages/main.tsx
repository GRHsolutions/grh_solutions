
import style from './main.module.scss';
import { NavBar } from "../generics/navBar/navBar";

interface MainProps {
    name: string
}

export const Main = ({
    name
}: MainProps) => {
    return(
        <>
        <div className={style.main}>
        <NavBar/>
        </div>
        <div className={style.main}>          
            {name}
        </div>
        </>
    )
}