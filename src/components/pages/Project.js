
import { parse, v4 as uuidv4 } from 'uuid'

import styles from './Project.module.css'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProjectForm from '../project/ProjectForm';
import ServiceForm from '../project/ServiceForm';

function Project() {

    const { id } = useParams()                 //O useParams me permite capturar dados como o Id e assim, paralelamente acessar os outros dados do banco de dados.
    console.log(id)

    const [project, setProject] = useState([]) // O usState retorna um par de valores, que permite atualizar o estado de de uma função (que é um desses valores)
    const [showProjectForm, setShowProjectForm] = useState(false)

    const [message, setMessage] = useState()
    const [type, setType] = useState()

    const [showServiceForm, setShowServiceForm] = useState(false)

    useEffect(() => {                          //o useEffect permite eu fazer a requisição apenas quando a minha dependencia for alterada, evitando requisições múltiplas.

        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, { //faço uma "busca" pelo URL do meu Banco de Dados e faço uma interpolação para que possa colocar o valor de id.
                method: 'GET',                              //O método GET tem como principal objetivo fazer buscas de dados.
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(resp => resp.json())                    //converto a reposta para json (padrão na maioria dos casos)
                .then(data => {
                    setProject(data)                        //capturo os dados da requisição e manipula o valor de Project criado na constante e atribuido como useState.
                })
                .catch(err => console.log(err))             //Captura um erro e exibi no console.
        }, 300)

    }, [id])

    function editPost (project) {

        setMessage('')

        // budget validation 
        if(project.budget < project.cost) {
            
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false

        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto de estudos alterado!')
            setType('success')
        })
        .catch(err => console.log(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm) //Alterna o valor entre true e false//
    }
    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm) //Alterna o valor entre true e false//
    }

    function createService() {

        setMessage('')

        // last service 
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        // maximum value validation 

        if(newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
            
        }

        // add service cost to project total cost

        project.cost = newCost

        // update project

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
        }).then(
            (resp => resp.json())
        )
        .then((data) => {
            console.log(data)
        })
        .catch(err => console.log(err))

    }

    return (
        /*Consigo ter acesso a todas as propiedades do objeto por meio da requisição feita no começo do código ex: poderia capturar o name apartir da requisição que me permite ter acesso as propiedades do objeto da db */
        <div className={styles.centraliza} >
            <>
                {project.name ? ( //Renderização condicional: Se project.name for true então ele renderiza...//
                    <div className={styles.project_details} >
                        <Container customClass="column">
                            {message && <Message type={type} msg={message} />} {/*Renderização condicional: Se message for verdadeiro então ele chama o componente, ou seja ele vai renderizar o componente.*/}
                            
                            <div className={styles.details_container} >
                                <h1> Projeto: {project.name} </h1>
                                <div className={styles.strock} ></div>
                                <button className={styles.btn} onClick={toggleProjectForm}>
                                    {!showProjectForm ? 'Editar Projeto' : 'Fechar Projeto'}
                                </button>

                                {!showProjectForm ? ( //Renderização condicional: Se showProjectForm for false então ele renderiza...(a exclamação faz essa pergunta à ele 'se for falso' = '!showProjectForm')//
                                    <div className={styles.project_info} >
                                        <p>
                                            <span>Categoria:</span> {project.category.name} {/*Esse span tem o objetivo ser um "label", de acordo com o...*/}
                                        </p>
                                        <p>
                                            <span>Total de orçamento:</span> {project.budget}
                                        </p>
                                        <p>
                                            <span>Total Utilizado:</span> {project.cost}
                                        </p>

                                    </div>
                                ) : (
                                    <div className={styles.project_info} >
                                        <ProjectForm 
                                        handleSubmit={editPost} 
                                        btnText="Concluir edição"
                                        projectData={project} 
                                        />
                                    </div>
                                )}
                            </div>
                            <div className={styles.service_form_container} >
                                <h2>Adicione um serviço.</h2>
                                <button className={styles.btn} onClick={toggleServiceForm}> {/* De início aqui, temos um botão que a função OnClick dele muda o estado de setShowServiceForm para false, então sempre que o botão for clicacado showService  */}
                                    {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                                </button>
                                <div className={styles.project_info} >
                                    {showServiceForm && 
                                    <ServiceForm 
                                    handleSubmit={createService}
                                    btnText="Adicionar serviço"
                                    projectData={project}
                                    />
                                    }{/* Renderização condicional caso showServiceForm for verdadeiro ele renderiza a div */}
                                </div>
                            </div>
                            <h2>Serviços</h2>
                            <Container customClass='start' >
                                <p>Itens de Serviços</p>
                            </Container>
                        </Container>
                    </div>
                ) : (
                    <Loading />
                )}


            </>
        </div>
    )
}

export default Project;