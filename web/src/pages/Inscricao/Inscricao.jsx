import { useState } from 'react'

import './Inscricao.css'
import axios from 'axios'

import { navigate, routes } from '@redwoodjs/router'
const Inscricao = () => {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarASenha, setConfirmarSenha] = useState('')
  const [palavraChave, setPalavraChave] = useState('')

  function aoClicarNoBotaoDeCancelar() {
    navigate(routes.login())
  }

  function aoDigitarNoCampoDePalavraChave(event) {
    const inputDePalavraChave = event.target
    setPalavraChave(inputDePalavraChave.value)
  }

  function aoDigitarNoCampoDeConfirmarSenha(event) {
    const inputDeConfirmarASenha = event.target
    setConfirmarSenha(inputDeConfirmarASenha.value)
  }

  function aoDigitarNoCampoDeNome(event) {
    const inputDeNome = event.target
    setNome(inputDeNome.value)
  }

  function aoDigitarNoCampoDeEmail(event) {
    const inputDeEmail = event.target
    setEmail(inputDeEmail.value)
  }

  function aoDigitarNoCampoDeSenha(event) {
    const inputDeSenha = event.target
    setSenha(inputDeSenha.value)
  }

  async function aoClicarNoBotaoDeCadastrar() {
    if (!email) {
      window.alert('E-mail não preenchido')
      return
    }

    if (!senha) {
      window.alert('Senha não preenchida')
      return
    }

    if (!confirmarASenha) {
      window.alert('Confirmar Senha não preenchido')
      return
    }

    if (confirmarASenha !== senha) {
      window.alert('Senhas não batem')
      return
    }

    if (!palavraChave) {
      window.alert('Digite a Palavra Chave')
      return
    }

    const solicitacaoDeInscricaoCompleta = {
      nome,
      email,
      senha,
      palavraChave,
    }
    //LOGICA DE CHAMAR O BACKEND
    try {
      await axios.post(
        'http://localhost:1880/api/usuarios/inscricao',
        solicitacaoDeInscricaoCompleta
      )

      window.alert('CADASTRO BEM SUCEDIDO!')
      navigate(routes.login())
    } catch (error) {
      window.alert('CADASTRO INVÁLIDO, TENTE NOVAMENTE')
    }
  }

  return (
    <>
      <div className="loginCard meio-do-monitor ubuntu-light">
        <div className="camposAcesso">
          <div>
            <label>Nome</label>
            <input
              value={nome}
              onChange={aoDigitarNoCampoDeNome}
              className="ubuntu-light inputAcesso"
              placeholder="Insira seu nome..."
            ></input>
          </div>
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
          <div>
            <label>Confirme Sua Senha</label>
            <input
              value={confirmarASenha}
              onChange={aoDigitarNoCampoDeConfirmarSenha}
              className="ubuntu-light inputAcesso"
              type="password"
              placeholder="Confirme sua senha..."
            ></input>
          </div>
          <div>
            <label>Palavra Chave</label>
            <input
              value={palavraChave}
              onChange={aoDigitarNoCampoDePalavraChave}
              className="ubuntu-light inputAcesso"
              type="password"
              placeholder="Palavra de recuperação..."
            ></input>
          </div>
        </div>

        <div className="containerBotoes">
          <button
            onClick={aoClicarNoBotaoDeCadastrar}
            className="ubuntu-light corBotaoCadastrar"
          >
            Cadastrar
          </button>
          <button
            onClick={aoClicarNoBotaoDeCancelar}
            className="ubuntu-light corBotaoCancelar"
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  )
}

export default Inscricao
