import styles from './Home.module.css'
import Programming from '../../img/Programming.png'
import LinkButton from '../layout/LinkButton';

function Home() {
    return (
        <section className={styles.home_container} > 
            <h1>Bem-vindo ao <span>AuxEstudos</span> </h1>
            <p>Comece a gerenciar seus estudos!</p>
            <LinkButton to="/newproject" text="Criar Projeto" />
            <img src={Programming} alt="Programming" />
        </section>
    )
}

export default Home;