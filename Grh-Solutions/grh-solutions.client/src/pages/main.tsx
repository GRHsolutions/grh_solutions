
import style from './main.module.scss';
import { NavBar } from "../generics/navBar/navBar";
import  Login  from '../testing/login/login';
import { Register } from '../testing/login/register';

interface MainProps {
    name: string
}


export const Main = ({
}: MainProps) => {
    return(
        <>
        <div className={style.main}>
            <Login/>
            <Register />
        </div>
        </>
    )
}