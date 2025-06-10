// logo
import logo from '@/assets/Logo.png'
// css file
import classes from './loading.module.css'
const Loading = () => {
    return <div className="w-full min-h-screen flex flex-col justify-center gap-4 items-center">
        <div>
            <img src={logo} width={200}/>
        </div>
        <div className={classes.loading}></div>
    </div>
}
export default Loading;