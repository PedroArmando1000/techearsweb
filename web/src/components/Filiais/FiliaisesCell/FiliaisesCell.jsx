import { Link, routes } from '@redwoodjs/router'

import Filiaises from 'src/components/Filiais/Filiaises'

export const QUERY = gql`
  query FindFiliaises {
    filiaises {
      id
      nome
      codigo
      dataCadastro
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No filiaises yet.{' '}
      <Link to={routes.newFiliais()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ filiaises }) => {
  return <Filiaises filiaises={filiaises} />
}
