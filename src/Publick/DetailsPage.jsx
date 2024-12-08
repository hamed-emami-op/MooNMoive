import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { UserContext } from "../compponents/context/UserContext";
import ReactStars from "react-rating-stars-component";

export default function DetailsPage() {
  const { id, type } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const { user, session, favoriteMovies, fetchFavoriteMovies } =
    useContext(UserContext);
  const {
    data: details,
    isLoading,
    error,
  } = useQuery(["movieId", id, type], async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=d52f00854ed915b688d5abec54bce588`
    );
    return response.data;
  });
  useEffect(() => {
    if (details) {
      const favMovie = favoriteMovies.find((f) => f.id === details?.id);
      setIsFavorite(Boolean(favMovie));
      console.log(favMovie);
    }
  }, [details, favoriteMovies]);
  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (error) return toast.error("invalidetion");

  async function handleAddToFavorite() {
    if (session) {
      const result = await axios.post(
        `https://api.themoviedb.org/3/account/${user?.id}/favorite?api_key=d52f00854ed915b688d5abec54bce588&session_id=${session}`,
        {
          media_type: "movie",
          media_id: details.id,
          favorite: !isFavorite,
        }
      );
      fetchFavoriteMovies();
      toast.success(
        `${details.title || details.name} ${isFavorite ? "removed" : "added"} `
      );
    } else {
      toast.error("Please login!");
    }
  }

  async function ratingChanged() {}
  return (
    <div className=" bg-white w-full h-[120vh] text-white ">
      <div
        className=" w-full h-[65vh] bg-center bg-no-repeat bg-cover"
        style={{
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          boxShadow: "inset 25em -17em 300px rgb(15, 14, 14)",
          backgroundImage: `url(https://image.tmdb.org/t/p/original${details.backdrop_path})`,
        }}
      ></div>
      <div className="absolute -mt-[25rem] px-[20rem] grid grid-cols-4 gap-10">
        <div className="shadow-2xl col-span-1">
          <img
            className="shadow-2xl"
            src={`https://image.tmdb.org/t/p/w400${details.poster_path}`}
            alt={details.title}
          />
        </div>
        <div className="col-span-3 shadow-2xl">
          <div className="flex gap-3 items-center ">
            <h2 className="text-4xl flex">{details.name || details.title}</h2>
            <time className="text-base text-slate-400 mt-3">
              {details.first_air_date?.split("-")[0] ||
                details.release_date?.split("-")[0]}
            </time>
          </div>
          <div className="flex gap-8 mt-8 text-yellow-400">
            <button
              className="flex items-center gap-2"
              onClick={handleAddToFavorite}
            >
              <span className="border border-yellow-300 rounded-full w-10 h-10 flex items-center justify-center pt-0.5">
                {isFavorite ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                  </svg>
                )}
              </span>{" "}
              {isFavorite ? "Remove from " : "Add to "}favorite
            </button>
            <button className="flex items-center gap-2">
              <span className="border border-yellow-300 rounded-full w-10 h-10 flex items-center justify-center pr-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
                </svg>
              </span>{" "}
              Share
            </button>
          </div>
          <div className="grid grid-cols-4 border-y-[1px] mt-8 border-slate-500">
            <div className="flex gap-6 col-span-1 border-r-[1px] border-slate-500 px-3 pt-3 backdrop-blur-md text-yellow-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
              <p className="text-2xl -mt-4">
                {parseInt(details.vote_average)}
                <span className="text-lg text-white">/10</span>{" "}
              </p>
              <p className="-ml-20 mt-4 text-sm">reviews: {details.vote_count}</p>
            </div>
            <div className="col-span-3 p-3 flex gap-10 pl-20 backdrop-blur-md">
              <p className="text-yellow-400">Rate this movie: </p>{" "}
              <ReactStars
                count={5}
                onChange={ratingChanged}
                isHalf={true}
                emptyIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                  </svg>
                }
                halfIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z" />
                  </svg>
                }
                filledIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                }
                activeColor="#ffd700"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
