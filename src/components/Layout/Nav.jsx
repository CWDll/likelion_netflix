import React, { useEffect, useState } from "react";
import { Container, LogoImg, UserImg, NavInput } from "./Styled.jsx";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  // 검색 로직인데, 검색하는 기능을 nav에 넣은 이유는 onChange를 통해서 값을 비교하고 검색하면서
  // 값이 계속 랜더링되어야 하는데, nav는 고정되어서 랜더링되지 않고 존재하는 것이니, 여기에서
  // 검색하고 아래 컴포넌트들이 랜더링되도록 만드는 방법이다.
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      //50 이상 내려가면
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <Container style={{ backgroundColor: show ? "black" : "white" }}>
      {/* <Container show={show ? "true" : "false"}> */}
      <LogoImg
        alt="Netflix logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2880px-Netflix_2015_logo.svg.png"
      />
      <NavInput
        value={searchValue}
        onChange={handleChange}
        type="text"
        placeholder="영화제목을 입력해주세요."
      />
      <UserImg
        alt="User logged"
        src="https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg"
      />
    </Container>
  );
}
