import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FuncionariosForm from 'src/components/Funcionarios/FuncionariosForm'

export const QUERY = gql`
  query EditFuncionariosById($id: Int!) {
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

const UPDATE_FUNCIONARIOS_MUTATION = gql`
  mutation UpdateFuncionariosMutation(
    $id: Int!
    $input: UpdateFuncionariosInput!
  ) {
    updateFuncionarios(id: $id, input: $input) {
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

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ funcionarios }) => {
  const [updateFuncionarios, { loading, error }] = useMutation(
    UPDATE_FUNCIONARIOS_MUTATION,
    {
      onCompleted: () => {
        toast.success('Funcionarios updated')
        navigate(routes.funcionarioses())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateFuncionarios({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Funcionarios {funcionarios?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <FuncionariosForm
          funcionarios={funcionarios}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
