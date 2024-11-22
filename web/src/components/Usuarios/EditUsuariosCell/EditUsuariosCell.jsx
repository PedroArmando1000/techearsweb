import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import UsuariosForm from 'src/components/Usuarios/UsuariosForm'

export const QUERY = gql`
  query EditUsuariosById($id: Int!) {
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

const UPDATE_USUARIOS_MUTATION = gql`
  mutation UpdateUsuariosMutation($id: Int!, $input: UpdateUsuariosInput!) {
    updateUsuarios(id: $id, input: $input) {
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

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ usuarios }) => {
  const [updateUsuarios, { loading, error }] = useMutation(
    UPDATE_USUARIOS_MUTATION,
    {
      onCompleted: () => {
        toast.success('Usuarios updated')
        navigate(routes.usuarioses())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateUsuarios({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Usuarios {usuarios?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <UsuariosForm
          usuarios={usuarios}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
