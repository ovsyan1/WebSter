import * as React from "react";
import Header from "../../components/Header";
import Typography from "@mui/material/Typography";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { signUpUser } from '../../api';
import { useNavigate } from 'react-router-dom';
import Footer from "../../components/Footer";

import {
  Container,
  Section,
  MainContainer,
  TextFieldWrapper,
  ButtonWrapper,
} from "./styles";

const SignUp: React.FC = () => {
  const [name, setName] = React.useState('');
  const [errorName, setErrorName] = React.useState(false);
  const [email, setEmail] = React.useState<string>('');
  const [errors, setErrors] = React.useState(false);
  const [disableBtn, setDisableBtn] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showErrorLabel, setShowErrorLabel] = React.useState(false);
  const [errorPassword, setErrorPassword] = React.useState(false);
  const [confirm, setPasswordConfirm] = React.useState('');
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);
  const [showErrorLabelConfirm, setShowErrorLabelConfirm] = React.useState(false);
  const [errorPasswordConfirm, setErrorPasswordConfirm] = React.useState(false);
  const [userAlreadyExists, setUserAlreadyExists] = React.useState('');
  document.title = "Sign Up";
  const navigate = useNavigate();
  const goToMainPage = () => navigate('/');

  const verifyData = (value: string, setErrors: (item: boolean) => void) => {
    if(value) {
      setDisableBtn(false);
      setErrors(false);
    } else {
      setErrors(true);
      setDisableBtn(true);
    }
  }

  const verifyAllData = () => {
    verifyData(email, setErrors);
    verifyData(password, setErrorPassword);
    verifyData(confirm, setErrorPasswordConfirm);
    verifyData(name, setErrorName);

      signUpUser({
      email,
      password,
      confirm,
      name,
      }).then(res => {
        if(res.status === 20){
          setUserAlreadyExists(res.message[0]);
          setEmail('');
          setName('');
          setPassword('');
          setPasswordConfirm('');
        }else if(res.status === 21){
          setUserAlreadyExists(res.message[0]);
          setPassword('');
          setPasswordConfirm('');
        }
        if(res.status === 0){
          goToMainPage();
        
        }
      }).catch(error => error);
  }

  const nameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { value },
    } = e;
    setUserAlreadyExists('');
    setName(value);
    setErrorName(false);
    if(name.length < 2){
      setErrorName(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { value },
    } = e;
    setUserAlreadyExists('');
    setEmail(value);
    setErrors(false);
    const regExp = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)+$"
    ).test(value);

    if (!regExp || value.length < 4 || value.length > 40) {
      setErrors(true);
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
      setErrors(false);
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

  const passwordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { value },
    } = e;
    setUserAlreadyExists('');
    setPasswordConfirm(value);
    setShowErrorLabelConfirm(false);
    if(value.length < 6){
      setShowErrorLabelConfirm(true);
      setErrorPasswordConfirm(true);
      setDisableBtn(true);
    }else{
      setDisableBtn(false);
      setErrorPasswordConfirm(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClickShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  }

  return (
    <>
      <Container>
        <Header loginButton />
        <Section>
          <MainContainer>
            <Typography variant="h5">Давай почнемо створювати твій аккаунт</Typography>
              <TextFieldWrapper
                id="outlined-basic"
                label="Ім'я"
                variant="outlined"
                value={name}
                onChange={nameChange}
                error={errorName}
                helperText={errorName && 'Please enter your name.'}
              />
              <TextFieldWrapper
                id="outlined-basic"
                label="Електронна адреса"
                variant="outlined"
                value={email}
                error={errors}
                helperText={errors && 'Please enter a valid email address.'}
                onChange={handleChange}
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
              <FormControl sx={{ m: 1, width: '43.5ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" error={showErrorLabelConfirm}>Пароль</InputLabel>
                <OutlinedInput
                      label="Confirm Password"
                      id="outlined-adornment-password"
                      type={showPasswordConfirm ? 'text' : 'password'}
                      value={confirm}
                      error={errorPasswordConfirm}
                      onChange={passwordConfirmChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPasswordConfirm}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {errorPasswordConfirm ? <div style={{color: '#f44336', marginLeft: 15, fontSize: 13}}>Looks like your password doesn’t match requirements.</div> : null}
              </FormControl>
              <div style={{color: 'red'}}>{userAlreadyExists}</div>
              <ButtonWrapper 
                variant="contained" 
                disabled={disableBtn}
                onClick={verifyAllData}
                >
                Зареєструватися
              </ButtonWrapper>
          </MainContainer>
        </Section>
        <Footer />
      </Container>
    </>
  );
};

export default SignUp;
