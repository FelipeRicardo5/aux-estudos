import styles from './ProjectCard.module.css'

import { Link } from 'react-router-dom';
import { BsPencil, BsFillTrash3Fill } from 'react-icons/bs';

function ProjectCard({ id, name, budget, category, handleRemove }) //Props que vão permitir o componente pai rendezirar seu conteúdo.
    {
    
    const remove = (e) => {//Lembrando que essa constante só é chamada em baixo por que ela é atribuida uma função
        e.preventDefault() //Cancela o evento se puder(e), sem impedir sua propagação.
        handleRemove(id)
    }

    return (

        //Esses dados passados por props em cada tag são recebidos pelo componente pai (Projects.js) onde lá é feito a requisição necessária
        //para capturar os dados, e para os inserir é criado um if ternário onde vai ler a quantidade de projects e caso seja maior que zero
        //renderiza a função criada por useState = projects que é atualizada por meio da manipulação feita pela requisição, essa função recebe 
        //outra função. .Map que itera sobre cada propiedade do objeto.

        <div className={styles.project_card} >
            <h4>{name}</h4>
            <p>
                <span>Orçamento:</span> R${budget}
            </p>
            <p className={styles.category_text} >
            <span className={`${styles[category.toLowerCase()]}`}></span> {category}
            </p>
            <div className={styles.project_card_action} >
                <Link to={`/project/${id}`} >
                <BsPencil /> Editar
                </Link>
                <button onClick={remove}>       {/*A função onClick recebe uma constante que vai ser responsável por excluir o card e paralelamente os dados do bd*/}
                    <BsFillTrash3Fill /> Excluir
                </button>
            </div>
        </div>
    )
}

export default ProjectCard;