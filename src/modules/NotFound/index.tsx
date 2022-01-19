import React from 'react';
import Header from "../../components/Header";

import { 
    Container, 
    Section, 
    MainContainer, 
    TypographyWrapper,
} from './styles';

const NotFound: React.FC = () => {
    return(
        <>
        <Container>
        <Header loginButton signUpButton/>
        <Section>
          <MainContainer>
              <TypographyWrapper>404 Page not found</TypographyWrapper>
          </MainContainer>
        </Section>
      </Container>
        </>
    )
}

export default NotFound;
