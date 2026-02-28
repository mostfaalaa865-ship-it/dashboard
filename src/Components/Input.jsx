function Input(props) {
  return (
    <input
      type={props.type}
      value={props.value}
      name={props.name}
      id={props.id}
      className={props.className}
      placeholder={props.placeholder}
      onBlur={props.onBlur}
      required=""
      onChange={props.onChange}
    />
  );
}

export default Input;
