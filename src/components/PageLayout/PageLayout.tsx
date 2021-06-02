import {
  Box,
  SimpleGrid,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import UserDataContext from '../../context/UserDataContext';
import { SLOT_ALERTS } from '../../models/slot';
import { auth, firestore } from '../../services/firebase';
import AlertCards from '../AlertCards/AlertCards';
import CardComponent from '../CardComponent/CardComponent';
const PageLayout = (): React.ReactElement => {
  const setUserData = useContext(UserDataContext)?.setUserData;
  const setSlotAlerts = useContext(UserDataContext)?.setSlotAlerts;
  const slotAlerts = useContext(UserDataContext)?.slotAlerts;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, uid, photoURL, phoneNumber } = user;
        if (setUserData)
          setUserData({
            displayName: displayName || '',
            uid,
            isLoggedIn: true,
            photoURL: photoURL,
            mobile_number: phoneNumber,
          });
        firestore
          .collection('users')
          .doc(uid)
          .get()
          .then((respData) => {
            const data = respData.data();
            const alert: Array<SLOT_ALERTS> = data ? data['alert'] : [];
            if (alert && alert.length && setSlotAlerts) {
              setSlotAlerts(alert);
            }
          });
      }
    });
  }, [setUserData, setSlotAlerts]);
  const variant = useBreakpointValue({ base: '1', md: '2' });
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  return (
    <SimpleGrid
      columns={slotAlerts && slotAlerts.length > 0 ? [1, 1, 2] : [1]}
      spacing={4}
    >
      <VStack
        padding={4}
        spacing={4}
        borderWidth="1px"
        borderRadius="lg"
        marginLeft={variant === '1' ? '0' : 'auto'}
        marginRight={
          variant === '1' ? '0' : slotAlerts && slotAlerts.length ? 0 : 'auto'
        }
        bg={bgColor}
        minW={variant === '2' ? '29rem' : 'unset'}
      >
        <Box>Create Appointment Alert</Box>
        <Box>
          <CardComponent />
        </Box>
      </VStack>
      {slotAlerts && slotAlerts.length > 0 && (
        <VStack
          padding={4}
          spacing={4}
          borderWidth="1px"
          borderRadius="lg"
          marginRight={variant === '2' ? 'auto' : 0}
          marginLeft={0}
          bg={bgColor}
          minW={variant === '2' ? '29rem' : 'unset'}
        >
          <AlertCards />{' '}
        </VStack>
      )}
    </SimpleGrid>
  );
};

export default PageLayout;
