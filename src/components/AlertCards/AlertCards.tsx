import { RepeatIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  CloseButton,
  Flex,
  Heading,
  IconButton,
  Text,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import UserDataContext from '../../context/UserDataContext';
import { SLOT_ALERTS } from '../../models/slot';
import { firestore } from '../../services/firebase';

interface ALERT extends SLOT_ALERTS {
  index: number;
}

const AlertCards = (): React.ReactElement => {
  const { colorMode } = useColorMode();
  const slotAlerts = useContext(UserDataContext)?.slotAlerts;
  const setSlotAlerts = useContext(UserDataContext)?.setSlotAlerts;
  const userData = useContext(UserDataContext)?.userData;
  const toast = useToast();
  const AlertBox = ({
    state_name,
    district_name,
    age_category,
    date_created,
    index,
    available,
    date_updated,
  }: ALERT) => (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      pos={'relative'}
      borderColor={available ? 'green.300' : 'yellow.400'}
      minW={'100%'}
    >
      {available && (
        <Heading fontSize={'1em'} alignSelf="center" marginBottom={4}>
          Slot Available
        </Heading>
      )}
      <Flex>
        <Center
          w="64px"
          h={'64px'}
          bg={colorMode === 'light' ? '#1a202c' : 'white'}
          color={colorMode === 'dark' ? '#1f2937' : 'white'}
          my={'auto'}
        >
          {age_category}
          {' + '}
        </Center>
        <Box flex="1">
          <Heading fontSize={'1em'} maxW="14rem" marginRight={'4rem'}>
            {district_name}
            {', '}
            {state_name}
          </Heading>
        </Box>
      </Flex>
      <Box>
        {!available && (
          <Text mt={4} fontSize={'0.9em'}>
            {'Created on '}
            {new Date(date_created || new Date().getTime()).toDateString()}
          </Text>
        )}
        {available && date_updated && (
          <Text mt={4} fontSize={'0.9em'}>
            {'Updated on '}
            {new Date(date_updated).toDateString()}
          </Text>
        )}
      </Box>
      <CloseButton
        pos={'absolute'}
        top={'16px'}
        right={'4px'}
        onClick={() => deleteAlert(index)}
      />
      {available && date_updated && (
        <IconButton
          variant="outline"
          colorScheme="teal"
          aria-label="Reset"
          size="sm"
          pos={'absolute'}
          top={'16px'}
          right={'40px'}
          icon={<RepeatIcon />}
          onClick={() => refreshAlert(index)}
        />
      )}
    </Box>
  );

  const deleteAlert = (index: number) => {
    if (userData && slotAlerts && setSlotAlerts) {
      const userObj = firestore.collection('users').doc(userData.uid);
      const removed = slotAlerts.filter((_data, i) => i !== index);
      setSlotAlerts(removed);
      userObj
        .update({ alert: removed })
        .then((data) => {
          toast({
            title: 'Alert Removed',
            status: 'info',
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((err) => {
          toast({
            title: 'Error Occured',
            description: 'Please try again',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        });
    }
  };

  const refreshAlert = (index: number) => {
    if (userData && slotAlerts && setSlotAlerts) {
      const userObj = firestore.collection('users').doc(userData.uid);
      slotAlerts[index].available = false;
      delete slotAlerts[index].date_updated;
      const newSlots = slotAlerts;
      setSlotAlerts([...newSlots]);
      userObj
        .update({ alert: newSlots })
        .then((data) => {
          toast({
            title: 'Alert Refreshed',
            status: 'info',
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((err) => {
          toast({
            title: 'Error Occured',
            description: 'Please try again',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        });
    }
  };

  return (
    <>
      <Box p={1} borderWidth="1px" width={'100%'}>
        <Text>{'Alerts'}</Text>
      </Box>
      {slotAlerts &&
        slotAlerts.map((slots, index) => (
          <AlertBox {...slots} index={index} key={index} />
        ))}
    </>
  );
};

export default AlertCards;
