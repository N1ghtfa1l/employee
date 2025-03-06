import { InputHTMLAttributes } from "react";
import style from './TextBox.module.scss'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  errorText?: string
  error?: boolean;
}

const TextBox = (props: IProps) => {
  const { error, errorText, ...propsInput } = props

  return (
    <div className={style.container}>
      <input
        {...propsInput}
        className={style.textBox}
      />
      {error && <span>{errorText}</span>}
    </div>
  );
};

export default TextBox;