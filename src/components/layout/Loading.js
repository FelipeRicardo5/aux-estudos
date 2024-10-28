import styles from './Loading.module.css'
import loading from '../../img/Spinner@1x-1.0s-200px-200px.svg'

function Loading() {
    return (
        <div className={styles.loader_container} >
            <img className={styles.loader} src={loading} alt="Carregando..."/>
        </div>
    )
}

export default Loading;