import { useContext } from "react";
import { UserContext } from "../../compponents/context/UserContext";
import toast from "react-hot-toast";

export default function Login() {
  const { login } = useContext(UserContext);

  function handelLogin(e) {
    e.preventDefault();
    const { username, password } = e.target.elements;

    login(username.value, password.value);
  }
  return (
    <div
      className="text-black w-full h-[945px] flex pr-[35em] "
      style={{
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(/little-bear-with-hat-that-says-hello_916191-272727.jpg)`,
      }}
    >
      <div
        className="mr-[30em] flex justify-center items-center w-full bg-white"
        style={{ boxShadow: "inset -12em -3.5em 112em 100px rgb(15, 14, 14)" }}
      >
        <div className="shadow-2xl p-12 backdrop-blur-md rounded-3xl">
          <form action="" onSubmit={handelLogin}>
            <input
              type="text"
              placeholder="username"
              name="username"
              className="block mb-20 outline-none border border-zinc-300 rounded-2xl p-2 text-base"
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              className="block mb-20 outline-none border border-zinc-300 rounded-2xl p-2 text-base"
            />
            <input
              type="submit"
              value="login"
              className="block outline-none border border-zinc-600 rounded-3xl p-2 text-base w-full bg-slate-200"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
