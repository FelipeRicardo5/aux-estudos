import { useNavigate } from 'react-router-dom';

import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.css';

function NewProject() {

    const navigate = useNavigate()

    function createPost(project) {

        // initialize auxEstudos and services
        project.aux = 0
        project.services = []

        fetch("http://localhost:5000/projects", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project),// Mandando os dados do projeto por post nessa rota do fetch 
        })
            .then(resp => resp.json()) //Conversão da resposta JSON para um objeto//
            .then(data => {
                console.log(data);
                //redirect
                navigate('/projects', { state: { message: 'Projeto criado com sucesso' } });
            })            
            .catch(err => console.log(err))

    }

    return (
        <div className={styles.teste}>
            <div className={styles.newproject_container} >
                <h1>Criar seu projeto de estudos!</h1>
                <p>Crie seu projeto para deopis adicionar os serviços</p>
                <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
            </div>
        </div>
    )
}

export default NewProject;

