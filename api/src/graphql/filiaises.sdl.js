export const schema = gql`
  type Filiais {
    id: Int!
    nome: String!
    codigo: String!
    latlong: [Float]!
    dataCadastro: DateTime
    logradouro:       String
    numero:           String
    nomeDoLogradouro: String
    bairro:           String
    cidade:           String
    estado:           String
    pais:             String
  }

  type Query {
    filiaises: [Filiais!]! @requireAuth
    filiais(id: Int!): Filiais @requireAuth
  }

  input CreateFiliaisInput {
    nome: String!
    codigo: String!
    latlong: [Float]!
    dataCadastro: DateTime
    logradouro:       String
    numero:           String
    nomeDoLogradouro: String
    bairro:           String
    cidade:           String
    estado:           String
    pais:             String
  }

  input UpdateFiliaisInput {
    nome: String!
    codigo: String!
    latlong: [Float]!
    dataCadastro: DateTime
    logradouro:       String
    numero:           String
    nomeDoLogradouro: String
    bairro:           String
    cidade:           String
    estado:           String
    pais:             String
  }

  type Mutation {
    createFiliais(input: CreateFiliaisInput!): Filiais! @requireAuth
    updateFiliais(id: Int!, input: UpdateFiliaisInput!): Filiais! @requireAuth
    deleteFiliais(id: Int!): Filiais! @requireAuth
  }
`
