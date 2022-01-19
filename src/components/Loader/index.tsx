// import React from "react";
// import {CenterWrapper} from "./styles";

// const Loader: React.FC = () => {

//   return (
//      <CenterWrapper><img src="/loader.gif" alt={'Йде завантаження...'}/></CenterWrapper>
//   );
// };

// export default Loader;

import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
};

export default Loader;
