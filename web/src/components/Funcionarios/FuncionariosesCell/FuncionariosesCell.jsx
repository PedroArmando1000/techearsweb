import { Link, routes } from '@redwoodjs/router'

import Funcionarioses from 'src/components/Funcionarios/Funcionarioses'

export const QUERY = gql`
  query FindFuncionarioses {
    funcionarioses {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No funcionarioses yet.{' '}
      <Link to={routes.newFuncionarios()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ funcionarioses }) => {
  return <Funcionarioses funcionarioses={funcionarioses} />
}
