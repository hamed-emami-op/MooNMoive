// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import { Link } from "react-router-dom";

// export default function TrendingMoviesSlider({ movies }) {
//   function imgColNot() {
//     return (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="16"
//         height="16"
//         fill="currentColor"
//         viewBox="0 0 16 16"
//       >
//         <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
//       </svg>
//     );
//   }
//   return (
//     <div className="bg-slate-950 p-4 pl-10">
//       <h2 className="text-3xl text-white">Trending</h2>
//       <Swiper slidesPerView={6} loop={true} autoplay={{ delay: 3000 }}>
//         {movies?.data?.map((movie) => {
//           return (
//             <SwiperSlide key={movie.id}>
//               <div className="text-center m-3">
//                 <Link to={`/kids/${movie.id}`}>
//                   {movie.poster_path ? (
//                     <img
//                       src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                       alt={movie.title}
//                       className={`flex justify-center items-center w-full h-80 object-cover rounded-lg transition-all duration-1000 hover:bg-black hover:opacity-100 hover:text-white`}
//                     />
//                   ) : (
//                     <div className="flex items-center justify-center h-80 w-full transition-all duration-300 bg-gray-200 rounded-lg">
//                       {imgColNot()}
//                     </div>
//                   )}
//                   {/* <h3 className="mt-2 text-white">{movie.title}</h3> */}
//                 </Link>
//               </div>
//             </SwiperSlide>
//           );
//         })}
//       </Swiper>
//     </div>
//   );
// }
