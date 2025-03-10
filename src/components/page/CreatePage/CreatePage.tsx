import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { AppDispatch } from "../../../store/store";
import { useState } from "react";
import style from './CreatePage.module.scss'
import { EMPLOYEE_ROLE, IEmployee } from "../../../assets/interfaces/IEmployee";
import Select from "../../UI/Select/Select";
import { formatDate, formatPhoneNumber, removeNonNumeric } from "../../../assets/utils/validators";
import { createEmployee } from "../../../slices/employeeSlices";
import TextBox from "../../UI/Input/TextBox";

interface IProps {
  roles: EMPLOYEE_ROLE[]
}

const CreatePage = (props: IProps) => {
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [birthday, setBirthday] = useState<string>('')
  const [role, setRole] = useState<EMPLOYEE_ROLE>('cook')
  const [isArchive, setIsArchive] = useState<boolean>(false)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const validators = {
    name: name.length >= 4,
    phone: removeNonNumeric(phone).length === 11,
    birthday: removeNonNumeric(birthday).length === 8
  }

  const onHandleCreate = () => {
    let isValid = true
    for (const el of Object.values(validators)) {
      if (!el) isValid = false
    }
    if (!isValid) return

    const newEmployee: IEmployee = {
      id: Date.now(),
      name,
      phone,
      birthday,
      role,
      isArchive
    }
    dispatch(createEmployee(newEmployee))
    navigate('/')
  }

  return (
    <div className={style.container}>
      <div>Создать карточку сотрудника</div>
      <div className={style.content}>
        <div>Имя <TextBox
          type="text"
          value={name} onChange={(e) => setName(e.target.value)}
          error={!validators.name}
          errorText='Имя должно содержать не менее 4 букв' />
        </div>
        <div>Телефон <TextBox
          type="tel"
          value={phone} onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
          error={!validators.phone}
          errorText='Введите корректный номер телефона' /></div>
        <div>День рождения <TextBox
          type="text"
          value={birthday} onChange={(e) => setBirthday(formatDate(e.target.value))}
          error={!validators.birthday}
          errorText="Введите полную дату рождения" /></div>
        <div>Роль <Select
          value={role}
          options={props.roles.map((el) => ({ label: el, value: el }))}
          onChange={(e) => setRole(e)}
        /></div>
        <label><input type="checkbox" checked={isArchive} onChange={() => setIsArchive(prev => !prev)} /> В архиве</label>
      </div>
      <button onClick={onHandleCreate}>Создать</button>
    </div>
  );
};

export default CreatePage;