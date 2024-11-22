export const schema = gql`
  type Usuarios {
    id: Int!
    palavraChave: String
    nome: String!
    email: String!
    senha: String!
    ativo: Boolean
    endereco: String
    foto: Byte
    ultimoAcesso: DateTime
    cabecalhoBase64Foto: String
  }
  type UsuariosUltimoAcesso {
    nome: String!
    ultimoAcesso: DateTime!
  }

  type Query {
    ultimosAcessos: [UsuariosUltimoAcesso!]! @requireAuth
    login(acesso: String!, psswd: String!): Usuarios @skipAuth
    usuarioses: [Usuarios!]! @requireAuth
    usuarios(id: Int!): Usuarios @requireAuth
  }

  input CreateUsuariosInput {
    nome: String!
    palavraChave: String
    email: String!
    senha: String!
    ativo: Boolean
    endereco: String
    foto: Byte
    cabecalhoBase64Foto: String
  }

  input UpdateUsuariosInput {
    nome: String
    email: String
    palavraChave: String
    senha: String
    ativo: Boolean
    endereco: String
    foto: Byte
    cabecalhoBase64Foto: String
  }

  type Mutation {
    esqueceuSuaSenha(solicitacao: JSON!): String! @requireAuth
    createUsuarios(input: CreateUsuariosInput!): Usuarios! @requireAuth
    updateUsuarios(id: Int!, input: UpdateUsuariosInput!): Usuarios!
      @requireAuth
    deleteUsuarios(id: Int!): Usuarios! @requireAuth
  }
`
