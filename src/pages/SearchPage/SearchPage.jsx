import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./style";
import { useDebounce } from "../../hooks/useDebounce";

function SearchPage() {
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState([]);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searchTerm = query.get("q");
  // 0.5초마다 search term 넣는 로직
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const fetchSearchMovie = async (searchTerm) => {
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      setSearchResult(request.data.result);
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  // 검색 결과 렌더링 함수
  // 얘를 return문 안에 바로 넣어줄 수도 있지만, 화면을 보는 시각적으로 좋게 하기 위해 위해 먼저 선언.
  // styled component 에 S. 으로 사용한 것은, import를 별도로 해올 필요 없이 styled 파일에 작성한 것을 가져와 쓸 수 있다.
  // 그리고 이게 component 인지 styled component인지를 판단할 수 있다. S. 으로 쓰는건 styled component이다.
  // 이 방법으로 쓰면 바로바로 ctrl + click 으로 수정 가능하니까 이 방법 쓰자 !
  const renderSearchResults = () => {
    return searchResult?.length > 0 ? (
      <S.SearchContainer>
        {searchResult.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl =
              "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <S.Movie key={movie.id}>
                <S.MovieConlumnPoster onClick={() => navigate(`/${movie.id}`)}>
                  <S.MoviePoster src={movieImageUrl} alt="movie" />
                </S.MovieConlumnPoster>
              </S.Movie>
            );
          }
        })}
      </S.SearchContainer>
    ) : (
      <S.NoResults>
        <S.NoResultTextWrapper>
          찿고자하는 검색어"{searchTerm}"에 맞는 영화가 없습니다.
        </S.NoResultTextWrapper>
      </S.NoResults>
    );
  };
  // console.log("sR" + searchResult);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  //   console.log("useLocation() : ", useLocation());

  //   console.log(useQuery());

  //   console.log(searchTerm);

  return <S.SearchContent>{debouncedSearchTerm}</S.SearchContent>;
}

export default SearchPage;
