import { Link } from 'react-router-dom'
import Container from './Container'
import styles from './NavBar.module.css'
import logo from '../../img/AuxEstudos.png'

function NavBar() {
    return (

        <nav className={styles.navbar}>
            <Container>
                <Link>
                    <img src={logo} alt='AuxEstudos' className={styles.logo} />
                </Link>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to='/projects'>Projects</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to='/company'>Company</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to='/contact'>Contact</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to='/newproject'>New Project</Link>
                    </li>
                </ul>
            </Container>
        </nav>

    )
}

export default NavBar;