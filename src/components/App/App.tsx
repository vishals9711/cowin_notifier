import { Box, ChakraProvider, Grid, theme, VStack } from '@chakra-ui/react';
import React from 'react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import CardComponent from '../CardComponent/CardComponent';

export const App = (): React.ReactElement => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <VStack padding={8} spacing={6} borderWidth="1px" borderRadius="lg" marginX={"auto"}>
          <Box>
            Vaccine Appointment Alert
            <ColorModeSwitcher justifySelf="flex-end" />
          </Box>
          <Box >
            <CardComponent />
          </Box>
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
);
