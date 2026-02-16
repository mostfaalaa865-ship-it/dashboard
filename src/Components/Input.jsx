function Input(props) {
  return (
    <input
      type={props.type}
      value={props.value}
      name={props.name}
      id={props.id}
      className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  focus:outline focus:outline-2 focus:outline-[#6696F5]   focus:outline focus:outline-2 focus:outline-[#6696F5]"
      placeholder={props.placeholder}
      required=""
      onChange={props.onChange}
    />
  );
}

export default Input;
