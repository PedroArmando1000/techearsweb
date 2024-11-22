import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Filiais/FiliaisesCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_FILIAIS_MUTATION = gql`
  mutation DeleteFiliaisMutation($id: Int!) {
    deleteFiliais(id: $id) {
      id
    }
  }
`

const FiliaisesList = ({ filiaises }) => {
  const [deleteFiliais] = useMutation(DELETE_FILIAIS_MUTATION, {
    onCompleted: () => {
      toast.success('Filiais deleted')
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
    if (confirm('Are you sure you want to delete filiais ' + id + '?')) {
      deleteFiliais({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Código</th>
            <th>Data Cadastro</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {filiaises.map((filiais) => (
            <tr key={filiais.id}>
              <td>{truncate(filiais.id)}</td>
              <td>{truncate(filiais.nome)}</td>
              <td>{truncate(filiais.codigo)}</td>
              <td>{timeTag(filiais.dataCadastro)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.filiais({ id: filiais.id })}
                    title={'Show filiais ' + filiais.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Exibir
                  </Link>
                  <Link
                    to={routes.editFiliais({ id: filiais.id })}
                    title={'Edit filiais ' + filiais.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Editar
                  </Link>
                  <button
                    type="button"
                    title={'Delete filiais ' + filiais.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(filiais.id)}
                  >
                    Excluir
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

export default FiliaisesList
