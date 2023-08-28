import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <HeaderWrapper>
      <Link to="/">
        <div className="txt_animate">
          <span>예</span>
          <span>제</span>
          <span>의</span>
          <span> </span>
          <span>근</span>
          <span>본</span>
        </div>
      </Link>
      <div className="login_text">
        <Link to="/login">로그인</Link>
      </div>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 20px;

  .txt_animate span {
    color: black;
    font-size: 40px;
    font-weight: 700;
    opacity: 0;
    transform: translate(-300px, 0) scale(0);
    animation: txtE 2s infinite;
  }

  .login_text {
    position: absolute;
    right: 20px;
  }

  @keyframes txtE {
    50% {
      transform: translate(20px, 0) scale(1);
      color: red;
    }
    60% {
      transform: translate(20px, 0) scale(1);
      color: orange;
    }
    70% {
      transform: translate(20px, 0) scale(1);
      color: yellow;
    }
    80% {
      transform: translate(20px, 0) scale(1);
      color: green;
    }
    90% {
      transform: translate(0) scale(1.2);
      color: blue;
    }
    100% {
      transform: translate(0) scale(1);
      opacity: 1;
      color: purple;
    }
  }
  .txt_animate span:nth-of-type(1) {
    animation-delay: 0.05s;
  }
  .txt_animate span:nth-of-type(2) {
    animation-delay: 0.1s;
  }
  .txt_animate span:nth-of-type(3) {
    animation-delay: 0.15s;
  }
  .txt_animate span:nth-of-type(4) {
    animation-delay: 0.2s;
  }
  .txt_animate span:nth-of-type(5) {
    animation-delay: 0.25s;
  }
  .txt_animate span:nth-of-type(6) {
    animation-delay: 0.3s;
  }
`;
