import Usuarios from 'src/components/Usuarios/Usuarios'

export const QUERY = gql`
  query FindUsuariosById($id: Int!) {
    usuarios: usuarios(id: $id) {
      id
      nome
      email
      senha
      ativo
      endereco
      foto
      cabecalhoBase64Foto
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Usuarios not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ usuarios }) => {
  return <Usuarios usuarios={usuarios} />
}
