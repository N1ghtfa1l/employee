import { useNavigate } from "react-router";
import { EMPLOYEE_ROLE } from "../../../assets/interfaces/IEmployee";
import style from './EmployeeCard.module.scss'

interface IProps {
  id: number,
  name: string,
  phone: string,
  role: EMPLOYEE_ROLE
}

const EmployeeCard = (props: IProps) => {
  const navigate = useNavigate()
  return (
    <div className={style.container} onClick={() => navigate(`/edit/${props.id}`)}>
      <div>{props.name}</div>
      <div>{props.role}</div>
      <div>{props.phone}</div>
    </div>
  );
};

export default EmployeeCard;