import { useEffect, useState } from "react";
import axios from "../../api/axios";
import MovieModal from "../MovieModal/MovieModal";
import { RowContainer, RowPosters, RowPoster, RowTitle } from "./Styled";

export default function Row({ isLarge, title, id, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchUrl]);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    console.log(request);

    setMovies(request.data.results);
  };

  return (
    <>
      <RowContainer>
        <RowTitle>{title}</RowTitle>
        <RowPosters>
          {movies.map((movie) => (
            <RowPoster
              key={movie.id}
              isLarge={isLarge ? "true" : "false"}
              src={`https://image.tmdb.org/t/p/original/${
                isLarge ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          ))}
        </RowPosters>
      </RowContainer>
    </>
  );
}
