import { useLocation } from 'react-router-dom';

import { useState, useEffect } from 'react';

import styles from './Projects.module.css';
import Message from "../layout/Message";
import Container from '../layout/Container';
import Loading from '../layout/Loading';
import LinkButton from '../layout/LinkButton';
import ProjectCard from '../project/ProjectCard';


function Projects() {

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {                                      {/*Dentro do useEffect que renderiza a partir de um modificação da dependência eu uso o setTimeout que é um função do próprio JS */}
                                                          
        setTimeout(() => {                                 //Dentro do setTimeout eu chamo uma arrow function sem parametros e coloco todo o GET, no final eu coloco o tempo que ele deve levar para fazer esse GET //
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            })
                .then(resp => resp.json()) //Conversão da resposta JSON para um objeto//
                .then(data => {
                    console.log(data)
                    setProjects(data)
                    setRemoveLoading(true) 
                })
                .catch((err) => console.log(err))
        }, 300)

    }, [])

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json'
            },

        }).then(resp => resp.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage('Projeto de estudos excluído com sucesso!')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={styles.centraliza} >
            <div className={styles.project_container} >
                <div className={styles.title_container} >
                    <h1>Meus Projetos</h1>
                    <LinkButton to="/newproject" text="Criar Projeto" />
                </div>

                {message && <Message type="sucess" msg={message} />}               {/*Verificação condicional onde ele só vai renderizar dependendo do valor */}
                {projectMessage && <Message type="error" msg={projectMessage} />} {/*Verificação condicional onde ele só vai renderizar dependendo do valor */}
                <Container customClass="start" >                                   {/*do valor de message (false) ou (true)*/}
                    {projects.length > 0 &&           /*<<--------------------------Dentro desse componente Container faço um renderização opcional onde se a quantidade de project que pego pelo method GET do back-end*/
                        projects.map((project) =>                                   /*for maior que zero ele recebe a função map, que vai iterar cada propiedade; id, name, e etc... (essa iteração serve justamente para modificar cada propiedade)*/
                            <ProjectCard
                                id={project.id}
                                name={project.name}
                                budget={project.budget}
                                category={project.category.name}
                                key={project.id}
                                handleRemove={removeProject}
                            />
                        )}
                        {!removeLoading && <Loading />}
                        {removeLoading && projects.length === 0 ? (
                        <p>  Não há projetos cadastrados... </p>
                        ) : null}

                </Container>

            </div>

        </div>
    )
}

export default Projects;