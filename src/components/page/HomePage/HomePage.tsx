import { useDispatch, useSelector } from 'react-redux';
import EmployeeCard from '../../UI/EmployeeCard/EmployeeCard';
import { AppDispatch, RootState } from '../../../store/store';
import { EMPLOYEE_ROLE } from '../../../assets/interfaces/IEmployee';
import { filterByRole, filterByStatus, sortBy } from '../../../slices/employeeSlices';
import Select from '../../UI/Select/Select';
import { useNavigate } from 'react-router';
import { AppRoutes } from '../../../assets/routes/routes';


interface IProps {
  roles: EMPLOYEE_ROLE[]
}


const HomePage = (props: IProps) => {
  const employees = useSelector((state: RootState) => state.employees.filteredEmployees)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  return (
    <>
      <button onClick={() => navigate(AppRoutes.CREATE_PAGE)}>Создать сотрудника</button>
      <Select
        options={props.roles.map(role => ({ label: role, value: role }))}
        onChange={(value) => dispatch(filterByRole(value))}
        defaultLabel='Выберите роль'

      />
      <Select
        options={[
          { label: 'Выберите статус', value: '' },
          { label: 'В архиве', value: 'true' },
          { label: 'Не в архиве', value: 'false' }
        ]}
        onChange={(value) => {
          dispatch(filterByStatus(value === "" ? null : JSON.parse(value)))
        }}
      />
      <Select
        options={[
          { label: 'Сортировать по', value: '' },
          { label: 'По имени', value: 'name' },
          { label: 'Дате рождения', value: 'birthday' },
        ]}
        onChange={(value) => dispatch(sortBy(value === "" ? null : value))}
      />
      <div>
        {employees.map((el) => <EmployeeCard name={el.name} phone={el.phone} key={el.id} role={el.role} id={el.id} />)}
      </div>
    </>
  );
};

export default HomePage;