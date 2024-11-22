import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import 'src/lib/formatters'

const DELETE_FUNCIONARIOS_MUTATION = gql`
  mutation DeleteFuncionariosMutation($id: Int!) {
    deleteFuncionarios(id: $id) {
      id
    }
  }
`

const Funcionarios = ({ funcionarios }) => {
  const [deleteFuncionarios] = useMutation(DELETE_FUNCIONARIOS_MUTATION, {
    onCompleted: () => {
      toast.success('Funcionarios deleted')
      navigate(routes.funcionarioses())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete funcionarios ' + id + '?')) {
      deleteFuncionarios({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Funcionarios {funcionarios.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{funcionarios.id}</td>
            </tr>
            <tr>
              <th>Nome</th>
              <td>{funcionarios.nome}</td>
            </tr>
            <tr>
              <th>Rg</th>
              <td>{funcionarios.rg}</td>
            </tr>
            <tr>
              <th>Cpf</th>
              <td>{funcionarios.cpf}</td>
            </tr>
            <tr>
              <th>Idade</th>
              <td>{funcionarios.idade}</td>
            </tr>
            <tr>
              <th>Altura</th>
              <td>{funcionarios.altura}</td>
            </tr>
            <tr>
              <th>Sexo</th>
              <td>{funcionarios.sexo}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editFuncionarios({ id: funcionarios.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(funcionarios.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Funcionarios
