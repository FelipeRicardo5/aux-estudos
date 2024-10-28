import { useState, useEffect } from 'react'
import styles from './Message.module.css'

function Message({ type, msg }) {

    const [visible, setVisible] = useState(false)

    //O useEffect roda após a renderização e pode ser controlado por dependências, executando quando essas dependências mudam. 

    useEffect(() => {
        
        //Crio uma condição onde caso a prop msg seja false ela irá esconder a msg tudo depende dessa condição aqui.
        if(!msg) {
            setVisible(false)
            return
        }
        setVisible(true)                        //Se ela não entrar na condição acima eu digo que ela será verdadeira, assim, mostrando a msg.
        const timer = setTimeout(() =>{        //Crio uma constante chamada timer para setar o tempo que a menssagem ficará a mostra.
            setVisible(false)
        }, 3000)

        return () => clearTimeout(timer)
    }, [msg])
    
    return (
        
        //Esse fragmento permite exibir essa div condicionalmente, onde, inicialmente o setamos as variáveis com false
        //ao se tornar True ele ira exibir a div ou o content em questão.

        <>                                                  
            {visible && (                                               
                <div className={`${styles.message} ${styles[type]}`} >  
                    <p>{msg}</p>
                </div>
            )}
        </>
        //Isso é uma verificação condicional. Se visible for true, o conteudo será renderizado
    )
}

export default Message;