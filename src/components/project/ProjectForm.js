import { useState, useEffect } from 'react'

import styles from '../project/ProjectForm.module.css'
import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

function ProjectForm({ handleSubmit, btnText, projectData }) {

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {} )

    useEffect(() => {
        fetch("http://localhost:5000/categories", { // Fetch é uma função assincrona utilizada para fazer requisições. 
            method: "GET",  	                    //Normalmente é utilizada dessa forma que fizemos mesmo, a diferença aqui
            headers: {                              //é, usamos o UseEffect(função "especial" do react), um hook do react que a nossa lógica rode após a renderização 
                'Content-Type': 'application/json'  //apenas uma vez, sem esse Hook a lógica de fetch poderia ser executada a cada renderização
            }                                       //do componente, causando múltiplas requisições desnecessárias.
        })
            .then((resp) => resp.json())            // Converto a reposta para JSON
            .then((data) => {                       // Aqui eu manipulo os dados e utilizando a função setCategories para atualizar o estado de Categories com esse dados
                setCategories(data)
            })
            .catch((err) => console.log(err))       //Aqui eu apenas recebo caso haja algum erro, e pra facilitar eu recebo eles pelo console.
    }, [])//      <---------------------------------Aqui eu digo que ele espera na condicional um valor vazio.

    const submit = (e) => {
        e.preventDefault() 
        console.log(project)
        handleSubmit(project)
    }

    function handleChange(e) {                        //Função responsável por chamar a constante que atualiza um estado inicial de uma certa constante.
        setProject({ ...project, [e.target.name]: e.target.value });    //("...") é usado para copiar as propiedades do objeto nesse caso (projects). e.target.name será a chave da propriedade no novo objeto. e.target.value é o valor correspondente a essa chave. 
    }
    

    //Função responsável por chamar a constante que atualiza um estado inicial de uma certa constante.
    //Essa função recebe como parâmetro a letra "e". Category se torna um objeto com duas propiedades que buscam o valor de entrada.

    function handleCategory(e) {                  //Chamo a constante setProject responsavel por atualizar o estado do project.
        setProject({ ...project, category: {      //"..." Costuma ser utilizado para herdar as propiedades do objeto ou array anterior.
            id: e.target.value,                
            name: e.target.options[e.target.selectedIndex].text,
        }, })
        console.log(project)
    }

    return (
        <form onSubmit={submit} className={styles.form} >
            <Input
                type="text"
                text="Nome do Projeto"
                name="name"
                placeholder="Insira o nome do projeto" 
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />
            <Input
                type="number"
                text="Orçamento do Projeto"
                name="budget"
                placeholder="Insira o orçamento total" 
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />    
            <Select
                name="category_id"
                text="Selecione a categoria"
                options={categories}
                handleOnChange={handleCategory}                     //Lembrando isso é um "If Ternário" que verifica, se a propiedade "category" do objeto project 
                value={project.category ? project.category.id : ''} //é verdadeira, então retorna category.id se não, retorna vazio ""
            />                                                      
            <SubmitButton
                text={btnText}
            />
        </form>
    )
}

export default ProjectForm;