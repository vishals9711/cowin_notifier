import { Box, ChakraProvider, Grid, theme } from '@chakra-ui/react';
import React from 'react';
import { UserDataProvider } from '../../context/UserDataContext';
import Navbar from '../Navbar/Navbar';
import PageLayout from '../PageLayout/PageLayout';

export const App = (): React.ReactElement => (
  <ChakraProvider theme={theme}>
    <UserDataProvider>
      <Box textAlign="center" fontSize={'1em'}>
        <Navbar>
          <Grid minH="85vh" p={4}>
            <PageLayout />
          </Grid>
        </Navbar>
      </Box>
    </UserDataProvider>
  </ChakraProvider>
);
