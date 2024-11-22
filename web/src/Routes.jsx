// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import EsqueceuSenha from './pages/EsqueceuSenha/EsqueceuSenha'
import Inscricao from './pages/Inscricao/Inscricao'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="Usuarios" titleTo="usuarioses" buttonLabel="Criar Novo Usuário" buttonTo="newUsuarios">
        <Route path="/usuarioses/new" page={UsuariosNewUsuariosPage} name="newUsuarios" />
        <Route path="/usuarioses/{id:Int}/edit" page={UsuariosEditUsuariosPage} name="editUsuarios" />
        <Route path="/usuarioses/{id:Int}" page={UsuariosUsuariosPage} name="usuarios" />
        <Route path="/usuarioses" page={UsuariosUsuariosesPage} name="usuarioses" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Filiais" titleTo="filiaises" buttonLabel="Nova Filial" buttonTo="newFiliais">
        <Route path="/filiaises/new" page={FiliaisNewFiliaisPage} name="newFiliais" />
        <Route path="/filiaises/{id:Int}/edit" page={FiliaisEditFiliaisPage} name="editFiliais" />
        <Route path="/filiaises/{id:Int}" page={FiliaisFiliaisPage} name="filiais" />
        <Route path="/filiaises" page={FiliaisFiliaisesPage} name="filiaises" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Funcionários" titleTo="funcionarioses" buttonLabel="New Funcionarios" buttonTo="newFuncionarios">
        <Route path="/funcionarioses/new" page={FuncionariosNewFuncionariosPage} name="newFuncionarios" />
        <Route path="/funcionarioses/{id:Int}/edit" page={FuncionariosEditFuncionariosPage} name="editFuncionarios" />
        <Route path="/funcionarioses/{id:Int}" page={FuncionariosFuncionariosPage} name="funcionarios" />
        <Route path="/funcionarioses" page={FuncionariosFuncionariosesPage} name="funcionarioses" />
      </Set>

      <Route name="inscricao" path="/inscricao" page={Inscricao}></Route>
      <Route name="login" path="/" page={Login}></Route>
      <Route name="dashboard" path="/dashboard" page={Dashboard}></Route>
      <Route name="esqueceuSenha" path="/esqueceusenha" page={EsqueceuSenha}></Route>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
