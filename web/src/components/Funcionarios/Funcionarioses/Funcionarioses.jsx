import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Funcionarios/FuncionariosesCell'
import { truncate } from 'src/lib/formatters'

const DELETE_FUNCIONARIOS_MUTATION = gql`
  mutation DeleteFuncionariosMutation($id: Int!) {
    deleteFuncionarios(id: $id) {
      id
    }
  }
`

const FuncionariosesList = ({ funcionarioses }) => {
  const [deleteFuncionarios] = useMutation(DELETE_FUNCIONARIOS_MUTATION, {
    onCompleted: () => {
      toast.success('Funcionarios deleted')
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
    if (confirm('Are you sure you want to delete funcionarios ' + id + '?')) {
      deleteFuncionarios({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Rg</th>
            <th>Cpf</th>
            <th>Idade</th>
            <th>Altura</th>
            <th>Sexo</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {funcionarioses.map((funcionarios) => (
            <tr key={funcionarios.id}>
              <td>{truncate(funcionarios.id)}</td>
              <td>{truncate(funcionarios.nome)}</td>
              <td>{truncate(funcionarios.rg)}</td>
              <td>{truncate(funcionarios.cpf)}</td>
              <td>{truncate(funcionarios.idade)}</td>
              <td>{truncate(funcionarios.altura)}</td>
              <td>{truncate(funcionarios.sexo)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.funcionarios({ id: funcionarios.id })}
                    title={'Show funcionarios ' + funcionarios.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editFuncionarios({ id: funcionarios.id })}
                    title={'Edit funcionarios ' + funcionarios.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete funcionarios ' + funcionarios.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(funcionarios.id)}
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

export default FuncionariosesList
