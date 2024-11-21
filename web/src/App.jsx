import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { PrimeReactProvider } from 'primereact/api';
import FatalErrorPage from 'src/pages/FatalErrorPage'


import './index.css'
import './scaffold.css'

import "primereact/resources/themes/lara-light-cyan/theme.css";

import 'primeicons/primeicons.css';

// fiz outro comentário
const App = ({ children }) => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">

      <PrimeReactProvider>

         <RedwoodApolloProvider>{children}</RedwoodApolloProvider>


         <div className='botao-home'>
            <i className="pi pi-home" style={{fontSize: '40px'}}></i>
        </div>
      </PrimeReactProvider>

    </RedwoodProvider>


  </FatalErrorBoundary>
)

export default App
