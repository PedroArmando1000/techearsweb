export const schema = gql`
  type Funcionarios {
    id: Int!
    nome: String!
    rg: String!
    cpf: String!
    idade: Int!
    altura: Float!
    sexo: String!
  }

  type Query {
    funcionarioses: [Funcionarios!]! @requireAuth
    funcionarios(id: Int!): Funcionarios @requireAuth
  }

  input CreateFuncionariosInput {
    nome: String!
    rg: String!
    cpf: String!
    idade: Int!
    altura: Float!
    sexo: String!
  }

  input UpdateFuncionariosInput {
    nome: String
    rg: String
    cpf: String
    idade: Int
    altura: Float
    sexo: String
  }

  type Mutation {
    createFuncionarios(input: CreateFuncionariosInput!): Funcionarios!
      @requireAuth
    updateFuncionarios(
      id: Int!
      input: UpdateFuncionariosInput!
    ): Funcionarios! @requireAuth
    deleteFuncionarios(id: Int!): Funcionarios! @requireAuth
  }
`
