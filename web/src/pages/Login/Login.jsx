import { useState } from 'react'

import './Login.css'
import axios from 'axios'

import { navigate, routes } from '@redwoodjs/router'

const Login = () => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  function aoDigitarNoCampoDeEmail(event) {
    const inputDeEmail = event.target
    setEmail(inputDeEmail.value)
  }
  function aoDigitarNoCampoDeSenha(event) {
    const inputDeSenha = event.target
    setSenha(inputDeSenha.value)
  }
  async function aoClicarNoBotaoDeInscricao() {
    navigate(routes.inscricao())
  }
  async function aoClicarNoBotaoDeTrocarSenha() {
    navigate(routes.esqueceuSenha())
  }
  async function aoClicarNoBotaoDeAcessar() {
    if (!email) {
      window.alert('E-mail não preenchido')
      return
    }

    if (!senha) {
      window.alert('Senha não preenchida')
      return
    }

    const solicitacaoDeLoginCompleta = {
      acesso: email,
      psswd: senha,
    }
    //LOGICA DE CHAMAR O BACKEND
    try {
      await axios.post(
        'http://localhost:1880/api/usuarios/login',
        solicitacaoDeLoginCompleta
      )

      window.alert('LOGIN BEM SUCEDIDO!')
      navigate(routes.dashboard())
    } catch (error) {
      window.alert('CREDENCIAIS INVÁLIDAS')
    }
  }

  return (
    <>
      <div className="loginCard meio-do-monitor ubuntu-light">
        <div className="camposAcesso">
          <div>
            <label>E-mail</label>
            <input
              value={email}
              onChange={aoDigitarNoCampoDeEmail}
              className="ubuntu-light inputAcesso"
              placeholder="Insira seu email..."
            ></input>
          </div>
          <div>
            <label>Senha</label>
            <input
              value={senha}
              onChange={aoDigitarNoCampoDeSenha}
              className="ubuntu-light inputAcesso"
              type="password"
              placeholder="Insira sua senha..."
            ></input>
          </div>
        </div>

        <div className="containerBotoes">
          <button
            onClick={aoClicarNoBotaoDeAcessar}
            className="ubuntu-light corBotaoAcessar"
          >
            Acessar
          </button>
          <button
            onClick={aoClicarNoBotaoDeInscricao}
            className="ubuntu-light corBotaoCadastrar"
          >
            Cadastrar
          </button>
        </div>
        <div className="containerEsqueceu">
          <span onClick={aoClicarNoBotaoDeTrocarSenha} className="esqueceu">
            Esqueceu Sua Senha?
          </span>
        </div>
      </div>
    </>
  )
}

export default Login
