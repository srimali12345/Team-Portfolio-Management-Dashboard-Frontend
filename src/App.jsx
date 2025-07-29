import AppRoutes from './AppRoutes';
import './styles/common/style.scss'
import {BrowserRouter} from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
    <AppRoutes/>
  </BrowserRouter>
  )
}

export default App