import React, { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from 'react-router-dom';
import { BodyWrapper, ButtonWrapper } from "./styles";
import { userDataRequest } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import AwesomeButton from '../../components/AwesomeButton';
document.title = "Main Page";

const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user.isUser);
  const goToOrderPage = () => navigate('/orders');

  useEffect(() => {
    const goToWelcomePage = () => navigate('/welcome');
    const goToMainPage = () => navigate('/');
    if (localStorage.getItem('token') || userData) {
      dispatch(userDataRequest());
      goToMainPage();
    } else {
      goToWelcomePage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, dispatch]);
  return (
    <BodyWrapper>
      <Header drawer/>
        <ButtonWrapper>
          <AwesomeButton goToOrderPage={goToOrderPage}/>
        </ButtonWrapper>
      <Footer />
    </BodyWrapper>
  );
};

export default MainPage;