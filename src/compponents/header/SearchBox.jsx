export default function SearchBox(props) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        className={`bg-gray-500 outline-none rounded-3xl p-1 px-3 text-yellow-50 transition-all duration-300 ease-in-out  ${props.inputShow ? " w-64 opacity-100 pr-[1.8rem] " : "mr-12 w-0 opacity-0"}`}
      />
    </div>
  );
}
