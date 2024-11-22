import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import FuncionariosForm from 'src/components/Funcionarios/FuncionariosForm'

const CREATE_FUNCIONARIOS_MUTATION = gql`
  mutation CreateFuncionariosMutation($input: CreateFuncionariosInput!) {
    createFuncionarios(input: $input) {
      id
    }
  }
`

const NewFuncionarios = () => {
  const [createFuncionarios, { loading, error }] = useMutation(
    CREATE_FUNCIONARIOS_MUTATION,
    {
      onCompleted: () => {
        toast.success('Funcionarios created')
        navigate(routes.funcionarioses())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createFuncionarios({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Funcionarios</h2>
      </header>
      <div className="rw-segment-main">
        <FuncionariosForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewFuncionarios
