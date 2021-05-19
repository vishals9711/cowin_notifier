import {
  Box,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import UserDataContext from '../../context/UserDataContext';
import { SLOT_ALERTS } from '../../models/slot';

const AlertCards = (): React.ReactElement => {
  const { colorMode } = useColorMode();
  const slotAlerts = useContext(UserDataContext)?.slotAlerts;
  const AlertBox = ({
    state_name,
    district_name,
    age_category,
    date_created,
  }: SLOT_ALERTS) => (
    <Box p={5} shadow="md" borderWidth="1px">
      <Flex>
        <Center
          w="48px"
          h={'48px'}
          bg={colorMode === 'light' ? '#1a202c' : 'white'}
          color={colorMode === 'dark' ? '#1f2937' : 'white'}
          marginRight={8}
          my={'auto'}
        >
          {age_category}
          {' + '}
        </Center>
        <Box flex="1">
          <Heading fontSize="xl">
            {district_name}
            {', '}
            {state_name}
          </Heading>
          <Text mt={4} fontSize="medium">
            {'Created on '}
            {new Date(date_created || new Date().getTime()).toDateString()}
          </Text>
        </Box>
      </Flex>
    </Box>
  );

  return (
    <Stack spacing={4}>
      <Box p={1} borderWidth="1px">
        <Text>{'Alerts'}</Text>
      </Box>
      {slotAlerts &&
        slotAlerts.map((slots, index) => <AlertBox {...slots} key={index} />)}
    </Stack>
  );
};

export default AlertCards;
