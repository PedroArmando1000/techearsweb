import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import UsuariosForm from 'src/components/Usuarios/UsuariosForm'

const CREATE_USUARIOS_MUTATION = gql`
  mutation CreateUsuariosMutation($input: CreateUsuariosInput!) {
    createUsuarios(input: $input) {
      id
    }
  }
`

const NewUsuarios = () => {
  const [createUsuarios, { loading, error }] = useMutation(
    CREATE_USUARIOS_MUTATION,
    {
      onCompleted: () => {
        toast.success('Usuarios created')
        navigate(routes.usuarioses())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createUsuarios({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Usuarios</h2>
      </header>
      <div className="rw-segment-main">
        <UsuariosForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewUsuarios
