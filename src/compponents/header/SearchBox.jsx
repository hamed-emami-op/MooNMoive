import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

export default function SearchBox(props) {
  const [query, setQuery] = useState("");
  const { data: sreach } = useQuery(["queryValue", query], async () => {
    const respons = await axios.get(
      `https://api.themoviedb.org/3/serach/multi?api_key=d52f00854ed915b688d5abec54bce588`
    );
    return respons.results;
  });

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search..."
          className={`bg-gray-500 outline-none rounded-3xl p-1 px-3 text-yellow-50 transition-all duration-300 ease-in-out  ${props.inputShow ? " w-64 opacity-100 pr-[1.8rem] " : "mr-12 w-0 opacity-0"}`}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
      </div>
    </div>
  );
}
