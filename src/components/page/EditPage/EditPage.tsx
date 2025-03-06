import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { AppDispatch, RootState } from "../../../store/store";
import { useState } from "react";
import style from './EditPage.module.scss'
import { EMPLOYEE_ROLE, IEmployee } from "../../../assets/interfaces/IEmployee";
import Select from "../../UI/Select/Select";
import { formatDate, formatPhoneNumber, removeNonNumeric } from "../../../assets/utils/validators";
import { updateEmployee } from "../../../slices/employeeSlices";
import TextBox from "../../UI/Input/TextBox";

interface IProps {
	roles: EMPLOYEE_ROLE[]
}

const EditPage = (props: IProps) => {
	const { id } = useParams()
	const employee = useSelector((state: RootState) => state.employees.filteredEmployees.find((el) => el.id === Number(id)))
	const [name, setName] = useState<string>(employee?.name!)
	const [phone, setPhone] = useState<string>(employee?.phone!)
	const [birthday, setBirthday] = useState<string>(employee?.birthday!)
	const [role, setRole] = useState<EMPLOYEE_ROLE>(employee?.role!)
	const [isArchive, setIsArchive] = useState<boolean>(employee?.isArchive!)
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>()

	const validators = {
		name: name.length >= 4,
		phone: removeNonNumeric(phone).length === 11,
		birthday: removeNonNumeric(birthday).length === 8
	}


	if (!employee) return <div>Сотрудник не найден</div>

	const onHandleSave = () => {
		let isValid = true
		for (const el of Object.values(validators)) {
			if (!el) isValid = false
		}
		if (!isValid) return

		const updatedEmployeeInfo: IEmployee = {
			...employee,
			name,
			phone,
			birthday,
			role,
			isArchive
		}
		dispatch(updateEmployee(updatedEmployeeInfo))
		navigate('/')
	}

	return (
		<div className={style.container}>
			<div>Редактировать карточку сотрудника</div>
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
			<button onClick={onHandleSave}>Сохранить</button>
		</div>
	);
};

export default EditPage;