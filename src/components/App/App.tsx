import { Box, ChakraProvider, Grid, theme } from '@chakra-ui/react';
import React from 'react';
import { UserDataProvider } from '../../context/UserDataContext';
import PageLayout from '../PageLayout/PageLayout';

export const App = (): React.ReactElement => (
  <ChakraProvider theme={theme}>
    <UserDataProvider>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <PageLayout />
        </Grid>
      </Box>
    </UserDataProvider>
  </ChakraProvider>
);
