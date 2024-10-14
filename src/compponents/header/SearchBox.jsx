import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
export default function SearchBox(props) {
  const [inputChange, setInputChange] = useState("");

  const { data } = useQuery(["api_key_navbar"], () => {
    axios.get("").then((res) => res.data);
  });
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search..."
          className={`bg-gray-500 outline-none rounded-3xl p-1 px-3 text-yellow-50 transition-all duration-300 ease-in-out  ${props.inputShow ? " w-64 opacity-100 pr-[1.8rem] " : "mr-12 w-0 opacity-0"}`}
          onChange={(e) => setInputChange(e.target.value)}
        />
      </div>
    </div>
  );
}
