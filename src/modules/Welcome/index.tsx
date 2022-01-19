import React, { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { BodyWrapper } from "./styles";

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user.isUser);
  useEffect(() => {
    const goToWelcomePage = () => navigate('/welcome');
    const goToMainPage = () => navigate('/');
    localStorage.getItem('token') || userData ? goToMainPage() : goToWelcomePage();
  }, [userData, navigate]);
  return (
    <BodyWrapper>
      <Header loginButton signUpButton />
      <h1 style={{ textAlign: "center" }}>Вітаємо!</h1>
      <Footer />
    </BodyWrapper>
  );
};

export default Welcome;
