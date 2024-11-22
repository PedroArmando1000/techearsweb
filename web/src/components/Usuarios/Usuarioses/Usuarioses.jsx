import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Usuarios/UsuariosesCell'
import { checkboxInputTag, truncate } from 'src/lib/formatters'

const DELETE_USUARIOS_MUTATION = gql`
  mutation DeleteUsuariosMutation($id: Int!) {
    deleteUsuarios(id: $id) {
      id
    }
  }
`

const UsuariosesList = ({ usuarioses }) => {
  const [deleteUsuarios] = useMutation(DELETE_USUARIOS_MUTATION, {
    onCompleted: () => {
      toast.success('Usuarios deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete usuarios ' + id + '?')) {
      deleteUsuarios({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Senha</th>
            <th>Ativo</th>
            <th>Endereco</th>
            <th>Foto</th>
            <th>Cabecalho base64 foto</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {usuarioses.map((usuarios) => (
            <tr key={usuarios.id}>
              <td>{truncate(usuarios.id)}</td>
              <td>{truncate(usuarios.nome)}</td>
              <td>{truncate(usuarios.email)}</td>
              <td>{truncate(usuarios.senha)}</td>
              <td>{checkboxInputTag(usuarios.ativo)}</td>
              <td>{truncate(usuarios.endereco)}</td>
              <td>{truncate(usuarios.foto)}</td>
              <td>{truncate(usuarios.cabecalhoBase64Foto)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.usuarios({ id: usuarios.id })}
                    title={'Show usuarios ' + usuarios.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editUsuarios({ id: usuarios.id })}
                    title={'Edit usuarios ' + usuarios.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete usuarios ' + usuarios.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(usuarios.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsuariosesList
