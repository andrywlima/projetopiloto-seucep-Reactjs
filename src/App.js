import React, { useState } from 'react';
import styles from './App.css';

const App = () => {

  // Declarando a variavel, set é a função que coloca o valor na variavel
    const [cep, setCep] = useState('');
    const [dados, setdados] = useState(''); // estado
    const [validade, setvalidade] = useState(true);

    const buscarCep = () => {

      // validando tabalho se o cep tem 8 digitos, 
      if (cep.replace('-', '').length != 8) {
        // setando a validade dizendo que ela é invalida(false)
        setvalidade(false)
  
        return;
      }
   // requisição
      fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`)  // onde coloca o web service ou api
        .then(res => res.json())  //transforma a resposta em .json
        .then(objeto => { 
          if ( objeto.erro) {
            setvalidade(false)
            alert("erro")
          } else {
            setdados(objeto)
            setvalidade(true)
            
  
  
              }
          
        })
        .catch(err =>   // caso de erro na requisição ou na resposta de um objeto
          console.log(err)
          )
    };

    return (

      
        <div className="Container">
          <div className= "Body-Container">
            <h1> Quer consultar seu CEP ou {'\n'} o CEP de algum lugar do Brasil?</h1>
            <h3> Digite o CEP desejado aqui!</h3>
            <div className = "Input-Container"> 
            <input placeholder="ex:00000000"
            maxLength={9}
            value={cep}
            onChange={(e) => {setCep(e.target.value)}}>
            </input>
            </div>


            <div className = "button-Container">
            <button onClick = {() => buscarCep()}> Buscar</button>
            </div>
            <text> { !validade && 'CEP não encontrado!'} </text>
      { validade &&  (

            
           

            <div className= "Value-Container">
              <text>CEP:</text>
            <input placeholder="" value={dados.cep}></input>
            <br></br>
            <text>BAIRRO:</text>
            <input placeholder="" value={dados.bairro}></input>
            <br></br>
            <text>LOGRADOURO:</text>
            <input placeholder="" value={dados.logradouro}></input>
            <br></br>
            <text>COMPLEMENTO:</text>
            <input placeholder="" value={dados.complemento}></input>
            <br></br>
            <text>UF:</text>
            <input placeholder="" value={dados.uf}></input>
            <br></br>
            <text>DDD DA REGIÇÃO:</text>
            <input placeholder="" value={dados.ddd}></input>
            </div>
            
                )}

            
          </div>

        </div>

    )

    

}

    export default App;