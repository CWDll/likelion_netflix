import { useEffect, useState } from "react";
import axios from "../../api/axios";
import MovieModal from "../MovieModal/MovieModal";
import { RowContainer, RowPosters, RowPoster, RowTitle } from "./Styled";

export default function Row({ isLarge, title, id, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  //modal이 열린 상태 저장
  const [modalOpen, setModalOpen] = useState(false);
  //선택한 영화를 저장
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    fetchMovieData();
  }, [fetchUrl]);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    console.log(request);

    setMovies(request.data.results);
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  return (
    <>
      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} /> //컴포넌트 가져오기
      )}
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
              onClick={() => handleClick(movie)}
            />
          ))}
        </RowPosters>
      </RowContainer>
    </>
  );
}
