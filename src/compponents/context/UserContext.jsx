import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(() => localStorage.getItem("session"));
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const navigate = useNavigate();

  async function getUserData() {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/account?api_key=d52f00854ed915b688d5abec54bce588&session_id=${session}`
      );
      setUser(data);
    } catch (error) {
      console.error(
        "Error fetching user data:",
        error.response?.data || error.message
      );
    }
  }

  async function fetchFavoriteMovies() {
    fetchFavoriteMovies(user.id)
  }
  async function fetchFavoriteMovies(id = user.id) {
    if (!user?.id) {
      console.error("User ID is missing or user is not logged in.");
      return;
    }
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/account/${id}/favorite/movies?api_key=d52f00854ed915b688d5abec54bce588&session_id=${session}`
      );
      setFavoriteMovies(data.results); // نتایج را در state ذخیره کن
    } catch (error) {
      console.error(
        "Error fetching favorite movies:",
        error.response?.data || error.message
      );
      toast.error("خطا در دریافت فیلم‌های مورد علاقه!");
    }
  }
  useEffect(() => {
    if (session) {
      getUserData();
    }
  }, [session]);

  useEffect(() => {
    if (user) {
      fetchFavoriteMovies();
    }
  }, [user]);

  function logout() {
    setUser({});
    setSession(null);
    setFavoriteMovies([]);
    localStorage.clear(window.location.reload(false));
  }

  async function login(username, password) {
    try {
      const tokenResult = await axios.get(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=d52f00854ed915b688d5abec54bce588`
      );
      const authorize = await axios.post(
        `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=d52f00854ed915b688d5abec54bce588`,
        {
          username,
          password,
          request_token: tokenResult.data.request_token,
        }
      );
      const session = await axios.post(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=d52f00854ed915b688d5abec54bce588`,
        {
          request_token: tokenResult.data.request_token,
        }
      );
      setSession(session.data.session_id);
      localStorage.setItem("session", session.data.session_id);
      navigate("/", {
        replace: true,
      });
      toast.success("Welcome to webSite me");
    } catch {
      toast.error(
        "پسورد تو یا یوزر نیمت اشتباه است و اگر یادت نباشه باید بهت بگم بگارفتی"
      );
    }
  }

  return (
    <UserContext.Provider
      value={{ user, login, session, logout, favoriteMovies, fetchFavoriteMovies }}
    >
      {children}
    </UserContext.Provider>
  );
}
