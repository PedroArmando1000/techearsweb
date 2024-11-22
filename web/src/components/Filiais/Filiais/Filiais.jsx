import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_FILIAIS_MUTATION = gql`
  mutation DeleteFiliaisMutation($id: Int!) {
    deleteFiliais(id: $id) {
      id
    }
  }
`

const Filiais = ({ filiais }) => {
  const [deleteFiliais] = useMutation(DELETE_FILIAIS_MUTATION, {
    onCompleted: () => {
      toast.success('Filiais deleted')
      navigate(routes.filiaises())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete filiais ' + id + '?')) {
      deleteFiliais({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Filiais {filiais.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>ID</th>
              <td>{filiais.id}</td>
            </tr>
            <tr>
              <th>Nome</th>
              <td>{filiais.nome}</td>
            </tr>
            <tr>
              <th>Código</th>
              <td>{filiais.codigo}</td>
            </tr>
            <tr>
              <th>Endereço</th>
              <td>{filiais.endereco}</td>
            </tr>
            <tr>
              <th>Data cadastro</th>
              <td>{timeTag(filiais.dataCadastro)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editFiliais({ id: filiais.id })}
          className="rw-button rw-button-blue"
        >
          Editar
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(filiais.id)}
        >
          Excluir
        </button>
      </nav>
    </>
  )
}

export default Filiais
