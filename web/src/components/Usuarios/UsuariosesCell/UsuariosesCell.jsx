import { Link, routes } from '@redwoodjs/router'

import Usuarioses from 'src/components/Usuarios/Usuarioses'

export const QUERY = gql`
  query FindUsuarioses {
    usuarioses {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No usuarioses yet.{' '}
      <Link to={routes.newUsuarios()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ usuarioses }) => {
  return <Usuarioses usuarioses={usuarioses} />
}
