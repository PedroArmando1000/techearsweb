import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import FiliaisForm from 'src/components/Filiais/FiliaisForm'

const CREATE_FILIAIS_MUTATION = gql`
  mutation CreateFiliaisMutation($input: CreateFiliaisInput!) {
    createFiliais(input: $input) {
      id
    }
  }
`

const NewFiliais = () => {
  const [createFiliais, { loading, error }] = useMutation(
    CREATE_FILIAIS_MUTATION,
    {
      onCompleted: () => {
        toast.success('Filiais created')
        navigate(routes.filiaises())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createFiliais({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Nova Filial</h2>
      </header>
      <div className="rw-segment-main">
        <FiliaisForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewFiliais
