import Funcionarios from 'src/components/Funcionarios/Funcionarios'

export const QUERY = gql`
  query FindFuncionariosById($id: Int!) {
    funcionarios: funcionarios(id: $id) {
      id
      nome
      rg
      cpf
      idade
      altura
      sexo
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Funcionarios not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ funcionarios }) => {
  return <Funcionarios funcionarios={funcionarios} />
}
