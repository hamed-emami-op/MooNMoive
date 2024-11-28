import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

export default function Series({ data }) {
  const fetchSeriesDetails = async () => {
    try {
      const responses = await Promise.all(
        data?.map((item) =>
          axios.get(
            `https://api.themoviedb.org/3/tv/${item.id}?api_key=d52f00854ed915b688d5abec54bce588&language=en-US`
          )
        )
      );
      const seriesDetails = responses.map((res) => res.data);
      return seriesDetails;
    } catch (error) {
      alert("Error fetching details:", error);
      return [];
    }
  };
  const { data: seriesDetails } = useQuery(
    ["seriesTrailer"],
    fetchSeriesDetails
  );
  const hoveredseries = data?.find((seriese) => seriese.id);
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }
  return (
    <div className="w-full bg-[#0f0e0e] h-[45rem]">
      <h3 className="text-white text-4xl pl-20 py-10">Series List</h3>
      <Swiper
        slidesPerView={6}
        loop={true}
        autoplay={{ delay: 3000 }}
        className="px-10 pb-5"
      >
        {seriesDetails?.map((series) => (
          <SwiperSlide key={series.id}>
            <div className="group w-full bg-[#0f0e0e] rounded-3xl p-2 h-[435px]">
              <Link to={`/series/${series.id}`}>
                <img
                  className="flex justify-center items-center w-full h-full object-cover rounded-3xl transition-all duration-1000 cursor-pointer hover:bg-opacity-50 hover:bg-black"
                  src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                  alt={series.title}
                />
                <div
                  className={` absolute w-full bg-[#0f0e0e] bottom-0 left-0 right-0 rounded-3xl bg-gradient-to-t to-transparent text-center text-white transition-all duration-300 bg-opacity-70 group-hover:opacity-0`}
                >
                  <p className="text-lg font-semibold text-white">
                    {series.original_name}
                  </p>
                  <p className="mb-2">
                    <strong>Rating :</strong> 10/{series.vote_average} |{" "}
                    {series.vote_count}
                  </p>
                </div>
                <div className="absolute overflow-auto overflow-y-scroll no-scrollbar text-white p-4 bottom-0 mb-2 w-72 h-[420px] rounded-3xl opacity-0 transition-all duration-300 hover:opacity-100 hover:bg-opacity-70 inline-block backdrop-blur-3xl ">
                  <h3 className=" font-semibold ">
                    <strong>Name series :</strong> {series.original_name}
                  </h3>
                  <p className="mt-2">
                    <strong>genres :</strong>{" "}
                    {series?.genres?.map((id) => (
                      <span key={id.id}> {id.name }</span>
                    ))}
                  </p>
                  <p className="mt-2 ">
                    <strong>overview : </strong>
                    {hoveredseries
                      ? truncateText(series.overview, 50)
                      : "No description available"}
                  </p>
                  <p className="mt-2">
                    <strong> number of episodes </strong> :{" "}
                    {series.number_of_episodes}
                  </p>
                  <p className="mt-2">
                    <strong> number of seasons </strong> :{" "}
                    {series.number_of_seasons}
                  </p>
                  <p className="mt-2">
                    <strong> Release Date </strong> : {series.first_air_date}
                  </p>
                  <p className="mt-2">
                    <strong> origin country </strong> : {series.origin_country}
                  </p>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
