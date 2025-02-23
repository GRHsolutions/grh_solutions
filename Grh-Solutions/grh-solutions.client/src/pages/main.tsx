
import style from './main.module.scss';

interface MainProps {
    name: string
}


export const Main = ({
}: MainProps) => {
    return(
        <>
        <div className={style.main}>
            {/* <RendererModl /> */}
        </div>
        </>
    )
}