import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Drawer from '../Drawer';
import { LinkWrapper } from "./styles";

export interface PageProps {
  drawer?: boolean;
  loginButton?: boolean;
  signUpButton?: boolean;
}

const Header: React.FC<PageProps> = ({ loginButton, signUpButton, drawer }) => {
  const loginButtonElement = loginButton && (
    <LinkWrapper to="/login">
      <Button color="inherit" variant="outlined">
        Увійти
      </Button>
    </LinkWrapper>
  );
  const signUpButtonElement = signUpButton && (
    <LinkWrapper to="/sign-up">
      <Button color="secondary" variant="contained">
        Зареєструватися
      </Button>
    </LinkWrapper>
  );

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          {drawer && <Drawer />}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <LinkWrapper to="/">Webster</LinkWrapper>
          </Typography>
          <Box mr={3}>{loginButtonElement}</Box>
          {signUpButtonElement}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

Header.defaultProps = {
  loginButton: false,
  signUpButton: false,
};

export default Header;
