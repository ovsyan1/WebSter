import React from 'react';
import Header from "../../components/Header";

import { 
    Container, 
    Section, 
    MainContainer, 
    TypographyWrapper,
    TextFieldWrapper,
    ButtonWrapper,
} from './styles';

const ForgetPassword: React.FC = () => {
    const [disableBtn, setDisableBtn] = React.useState(false);
    const [errorEmail, setErrorEmail] = React.useState(false);
    const [email, setEmail] = React.useState('');
    
    const verifyData = (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (email) {
        setDisableBtn(false);
        setErrorEmail(false)
      } else {
        setDisableBtn(true);
        setErrorEmail(true);
      }
    };
    const emailChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const {
        target: { value },
      } = e;
      setEmail(value);
      setErrorEmail(false);
      const regExp = new RegExp(
        "^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)+$"
      ).test(value);

      if (!regExp || value.length < 4 || value.length > 40) {
        setErrorEmail(true);
        setDisableBtn(true);
      } else {
        setDisableBtn(false);
        setErrorEmail(false);
      }
    };

    return(
        <>
        <Container>
        <Header loginButton/>
        <Section>
          <MainContainer>
            <TypographyWrapper variant="h5">Please type your email address and we will send you reset password by email.</TypographyWrapper>
            <TextFieldWrapper
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              error={errorEmail}
              helperText={errorEmail && 'Please enter a valid email address.'}
              onChange={emailChange}
            /> 
            <ButtonWrapper
              type="submit"
              onClick={verifyData} 
              variant="contained"
              disabled={disableBtn}
            >
              Get Started
            </ButtonWrapper>
          </MainContainer>
        </Section>
      </Container>
        </>
    )
}

export default ForgetPassword;