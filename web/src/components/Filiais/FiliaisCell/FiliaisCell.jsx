import Filiais from 'src/components/Filiais/Filiais'

export const QUERY = gql`
  query FindFiliaisById($id: Int!) {
    filiais: filiais(id: $id) {
      id
      nome
      codigo
      endereco
      dataCadastro
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Filiais not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ filiais }) => {
  return <Filiais filiais={filiais} />
}
