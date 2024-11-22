import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag } from 'src/lib/formatters'

const DELETE_USUARIOS_MUTATION = gql`
  mutation DeleteUsuariosMutation($id: Int!) {
    deleteUsuarios(id: $id) {
      id
    }
  }
`

const Usuarios = ({ usuarios }) => {
  const [deleteUsuarios] = useMutation(DELETE_USUARIOS_MUTATION, {
    onCompleted: () => {
      toast.success('Usuarios deleted')
      navigate(routes.usuarioses())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete usuarios ' + id + '?')) {
      deleteUsuarios({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Usuarios {usuarios.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{usuarios.id}</td>
            </tr>
            <tr>
              <th>Nome</th>
              <td>{usuarios.nome}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{usuarios.email}</td>
            </tr>
            <tr>
              <th>Senha</th>
              <td>{usuarios.senha}</td>
            </tr>
            <tr>
              <th>Ativo</th>
              <td>{checkboxInputTag(usuarios.ativo)}</td>
            </tr>
            <tr>
              <th>Endereco</th>
              <td>{usuarios.endereco}</td>
            </tr>
            <tr>
              <th>Foto</th>
              <td>{usuarios.foto}</td>
            </tr>
            <tr>
              <th>Cabecalho base64 foto</th>
              <td>{usuarios.cabecalhoBase64Foto}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editUsuarios({ id: usuarios.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(usuarios.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Usuarios
