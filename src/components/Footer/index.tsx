import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { FooterWrapper, LinkWrapper } from "./styles";

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 1 }}
        bgcolor="text.secondary"
        color="white"
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1} mt={{ xs: 10, sm: 5 }}>Help</Box>
              <Box>
                <LinkWrapper to="/" color="inherit">
                  Contact
                </LinkWrapper>
              </Box>
              <Box>
                <LinkWrapper to="/" color="inherit">
                  Support
                </LinkWrapper>
              </Box>
              <Box>
                <LinkWrapper to="/" color="inherit">
                  Privacy Policy
                </LinkWrapper>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1} mt={{ xs: 10, sm: 5 }}>Account</Box>
              <Box>
                <LinkWrapper to="/login" color="inherit">
                  Login
                </LinkWrapper>
              </Box>
              <Box>
                <LinkWrapper to="/sign-up" color="inherit">
                  Register
                </LinkWrapper>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1} mt={{ xs: 10, sm: 5 }}>Help</Box>
              <Box>
                <LinkWrapper to="/" color="inherit">
                  Backup
                </LinkWrapper>
              </Box>
              <Box>
                <LinkWrapper to="/" color="inherit">
                  History
                </LinkWrapper>
              </Box>
              <Box>
                <LinkWrapper to="/" color="inherit">
                  Roll
                </LinkWrapper>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            Webster &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </FooterWrapper>
  );
};

export default Footer;
