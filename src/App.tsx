import { Route, Routes } from 'react-router'
import './App.scss'
import HomePage from './components/page/HomePage/HomePage'
import { AppRoutes } from './assets/routes/routes'
import EditPage from './components/page/EditPage/EditPage'
import NotFoundPage from './components/page/NotFoundPage/NotFoundPage'
import { EMPLOYEE_ROLE } from './assets/interfaces/IEmployee'
import CreatePage from './components/page/CreatePage/CreatePage'

const ROLES: EMPLOYEE_ROLE[] = ['cook', 'driver', 'waiter']

function App() {
  return (
    <div className='container'>
      <Routes>
        <Route path={AppRoutes.HOME_PAGE} element={<HomePage roles={ROLES} />} />
        <Route path={AppRoutes.EDIT_PAGE} element={<EditPage roles={ROLES} />} />
        <Route path={AppRoutes.CREATE_PAGE} element={<CreatePage roles={ROLES} />} />
        <Route path={AppRoutes.NOT_FOUND_PAGE} element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
