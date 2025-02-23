
import style from './main.module.scss';
import { RendererModl } from '../components/login/RendererModl';

interface MainProps {
    name: string
}


export const Main = ({
}: MainProps) => {
    return(
        <>
        <div className={style.main}>
            <RendererModl />
        </div>
        </>
    )
}