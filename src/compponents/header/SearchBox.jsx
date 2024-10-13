import { useState } from "react";

export default function SearchBox(props) {
  const [inputChange, setInputChange] = useState("");
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        className={`bg-gray-500 outline-none rounded-3xl p-1 px-3 text-yellow-50 transition-all duration-300 ease-in-out  ${props.inputShow ? " w-64 opacity-100 pr-[1.8rem] " : "mr-12 w-0 opacity-0"}`}
        onChange={(e) => setInputChange(e.target.value)}
      />
      {inputChange && (
        <div
          className={`overflow-auto bg-gray-500 transition-all duration-300 ease-in-out w-64 ${inputChange ? " h-150 opacity-100 " : "h-0 opacity-0"}`}
        >
          {props.map(() => {
            <div>
              <img src="" alt="" />
              <p>{}</p>
            </div>;
          })}
        </div>
      )}
    </div>
  );
}
