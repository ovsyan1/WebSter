import * as React from "react";
import Typography from "@mui/material/Typography";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Header from "../../components/Header";
import { loginRequest } from '../../api';
import { useNavigate } from 'react-router-dom';
import Footer from "../../components/Footer";

import {
  Container,
  Section,
  MainContainer,
  TextFieldWrapper,
  ButtonWrapper,
  LinkSubTitle1,
} from "./styles";

const Login: React.FC = () => {
  const [disableBtn, setDisableBtn] = React.useState(false);
  const [errorEmail, setErrorEmail] = React.useState<{ email: string }>();
  const [errorPassword, setErrorPassword] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showErrorLabel, setShowErrorLabel] = React.useState(false);
  const [userAlreadyExists, setUserAlreadyExists] = React.useState('');
  const navigate = useNavigate();
  const goToMainPage = () => navigate('/');


  const verifyData = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (email) {
      setDisableBtn(false);
      setErrorEmail({ email: "" });
    } else {
      setDisableBtn(true);
      setErrorEmail({ email: "please write valid email." });
    }
    if (password) {
      setDisableBtn(false);
      setErrorPassword(false);
      setShowErrorLabel(false);
    } else {
      setShowErrorLabel(true);
      setDisableBtn(true);
      setErrorPassword(true);
    }
    loginRequest({email, password}).then((res) => {
      if(res.status === 20){
        setUserAlreadyExists(res.message[0]);
      }else if(res.status === 3){
        setUserAlreadyExists(res.message[0]);
        setEmail('');
        setPassword('');
      }else if(res.status === 2){
        setUserAlreadyExists(res.message[0]);
        setEmail('');
        setPassword('');
      }
      if(res.status === 0){
        goToMainPage();
      }
    })
  };

  const emailChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { value },
    } = e;
    setUserAlreadyExists('');
    setEmail(value);
    const regExp = new RegExp("^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)+$").test(value);

    if(!regExp || value.length < 4 || value.length > 40){
      setErrorEmail({email: 'Please enter a valid email address.'});
      setDisableBtn(true);
    }else{
      setDisableBtn(false);
      setErrorEmail({email: ''})
    }
  };

  const passwordChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { value },
    } = e;
    setUserAlreadyExists('');
    setPassword(value);
    setShowErrorLabel(false);
    if(value.length < 6){
      setShowErrorLabel(true);
      setErrorPassword(true);
      setDisableBtn(true);
    }else{
      setDisableBtn(false);
      setErrorPassword(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  return (
    <>
      <Container>
        <Header signUpButton />
        <Section>
          <MainContainer>
            <Typography variant="h5">Логінізація</Typography>
            <TextFieldWrapper
              id="outlined-basic"
              label="Електронна адреса"
              variant="outlined"
              value={email}
              error={!!errorEmail?.email}
              helperText={errorEmail?.email}
              onChange={emailChange}
            />
            <FormControl sx={{ m: 1, width: '43.5ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password" error={showErrorLabel}>Пароль</InputLabel>
              <OutlinedInput
                    label="Password"
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    error={errorPassword}
                    onChange={passwordChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {errorPassword ? <div style={{color: '#f44336', marginLeft: 15, fontSize: 13}}>Looks like your password doesn’t match requirements.</div> : null}
              </FormControl>
            <LinkSubTitle1 to="/forget-password">
                            <Typography variant="subtitle1">забув пароль?</Typography>
            </LinkSubTitle1>
            <div style={{color: 'red'}}>{userAlreadyExists}</div>
            <ButtonWrapper
              type="submit"
              onClick={verifyData}
              variant="contained"
              disabled={disableBtn}
            >
              Увійти
            </ButtonWrapper>
          </MainContainer>
        </Section>
        <Footer />
      </Container>
    </>
  );
};

export default Login;
