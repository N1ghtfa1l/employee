
interface IOption<T> {
    label: string;
    value: T;
}

interface IProps<T> {
    options: IOption<T>[];
    defaultLabel?: string;
    value?: string
    onChange: (value: T) => void;
}

const Select = <T extends string>(props: IProps<T>) => {
    return (
        <select value={props.value} onChange={(e) => {
            props.onChange(e.target.value as T)
        }}>
            {props.defaultLabel && <option value="">{props.defaultLabel}</option>}
            {props.options.map((option) => (
                <option key={String(option.value)} value={String(option.value)}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;
