import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BodyWrapper } from "./styles";

const Repository: React.FC = () => {
  return (
    <>
      <BodyWrapper>
        <Header drawer />
        <Typography variant="h2">Хранилище</Typography>
        <Link to="/">home</Link>
        <Footer />
      </BodyWrapper>
    </>
  );
};

export default Repository;
