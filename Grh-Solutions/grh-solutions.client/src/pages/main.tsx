
import style from './main.module.scss';
import { RendererModl } from '../components/login/RendererModl';
import { useTheme } from '@mui/material';

interface MainProps {
    name: string
}


export const Main = ({
}: MainProps) => {
    const theme = useTheme();
    return(
        <>
        <div className={style.main}
            style={{
                backgroundColor: theme.palette.background.default 
            }}
        >
            <RendererModl />
        </div>
        </>
    )
}