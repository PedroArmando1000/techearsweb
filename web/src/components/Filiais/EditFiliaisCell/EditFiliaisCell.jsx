import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FiliaisForm from 'src/components/Filiais/FiliaisForm'

export const QUERY = gql`
  query EditFiliaisById($id: Int!) {
    filiais: filiais(id: $id) {
      id
      nome
      latlong
      codigo
      dataCadastro
      logradouro
      nomeDoLogradouro
      numero
      bairro
      cidade
      estado
      pais
    }
  }
`

const UPDATE_FILIAIS_MUTATION = gql`
  mutation UpdateFiliaisMutation($id: Int!, $input: UpdateFiliaisInput!) {
    updateFiliais(id: $id, input: $input) {
      id
      nome
      codigo
      dataCadastro
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ filiais }) => {
  const [updateFiliais, { loading, error }] = useMutation(
    UPDATE_FILIAIS_MUTATION,
    {
      onCompleted: () => {
        toast.success('Filiais updated')
        navigate(routes.filiaises())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateFiliais({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Editar Filial
        </h2>
      </header>
      <div className="rw-segment-main">
        <FiliaisForm
          filiais={filiais}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
