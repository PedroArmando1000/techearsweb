import { db } from 'src/lib/db'

export const usuarioses = () => {
  return db.usuarios.findMany()
}

export const esqueceuSuaSenha = async ({ solicitacao }) => {
  try {
    const emailInformado = solicitacao.email
    const palavraChaveInformada = solicitacao.palavraChave

    const consultaUsuarios = await db.usuarios.findMany({
      where: {
        email: emailInformado,
        palavraChave: palavraChaveInformada,
      },
    })

    const usuarioEncontrado = consultaUsuarios[0]

    if (!usuarioEncontrado) {
      return 'SOLICITAÇÃO INVÁLIDA'
    }

    await db.usuarios.update({
      data: {
        senha: solicitacao.senha,
      },
      where: { id: usuarioEncontrado.id },
    })
  } catch (error) {
    return 'ERRO AO  PROCESSAR'
  }

  return 'TROCA FEITA COM SUCESSO!'
}

export const login = async ({ acesso, psswd }) => {
  const resultadoDoLogin = await db.usuarios.findMany({
    where: {
      email: acesso,
      senha: psswd,
    },
  })


  return resultadoDoLogin[0]
}

export const ultimosAcessos = async () => {
  const listagemDeUsuariosOrdenadaPeloUltimoAcessoDeFormaDecrescente =
    await db.usuarios.findMany({
      where: {
        ultimoAcesso: {
          not: null
        }
      },
      orderBy: {
        ultimoAcesso: 'desc',
      },
    })




  const listagemConvertidaEmDadosDeUltimoAcesso =
    listagemDeUsuariosOrdenadaPeloUltimoAcessoDeFormaDecrescente.map(
      (usuario) => ({
        nome: usuario.nome,
        ultimoAcesso: usuario.ultimoAcesso,
      })
    )


    console.log(listagemConvertidaEmDadosDeUltimoAcesso)
  return listagemConvertidaEmDadosDeUltimoAcesso
}

export const usuarios = ({ id }) => {
  return db.usuarios.findUnique({
    where: { id },
  })
}

export const createUsuarios = ({ input }) => {
  return db.usuarios.create({
    data: input,
  })
}

export const updateUsuarios = ({ id, input }) => {
  return db.usuarios.update({
    data: input,
    where: { id },
  })
}

export const deleteUsuarios = ({ id }) => {
  return db.usuarios.delete({
    where: { id },
  })
}
