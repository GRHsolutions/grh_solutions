import { SideBar } from "../generics/sidebar/sideBar"
import style from './main.module.scss';

interface MainProps {
    name: string
}

export const Main = ({
    name
}: MainProps) => {
    return(
        <div className={style.main}>
            <SideBar />
            {name}
        </div>
    )
}