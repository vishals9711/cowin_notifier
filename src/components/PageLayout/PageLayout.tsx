import { Box, Button, SimpleGrid, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import UserDataContext from '../../context/UserDataContext';
import { SLOT_ALERTS } from '../../models/slot';
import { auth, firestore } from '../../services/firebase';
import AlertCards from '../AlertCards/AlertCards';
import CardComponent from '../CardComponent/CardComponent';
import LoginModal from '../LoginModal/LoginModal';
const PageLayout = (): React.ReactElement => {
  const [modalStatus, setModalStatus] = useState(false);
  const setUserData = useContext(UserDataContext)?.setUserData;
  const userData = useContext(UserDataContext)?.userData;
  const setSlotAlerts = useContext(UserDataContext)?.setSlotAlerts;
  const slotAlerts = useContext(UserDataContext)?.slotAlerts;
  const onModalClose = () => {
    setModalStatus(false);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, uid } = user;
        console.log(displayName);
        console.log(uid);
        if (setUserData)
          setUserData({
            displayName: displayName || '',
            uid,
            isLoggedIn: true,
          });
        firestore
          .collection('users')
          .doc(uid)
          .get()
          .then((respData) => {
            console.log(respData.data());
            const data = respData.data();
            const alert: Array<SLOT_ALERTS> = data ? data['alert'] : [];
            if (alert && alert.length && setSlotAlerts) {
              setSlotAlerts(alert);
            }
          });
      }
    });
  }, [setUserData, setSlotAlerts]);

  return (
    <SimpleGrid
      columns={slotAlerts && slotAlerts.length > 0 ? [1, 1, 2] : [1]}
      spacing={4}
    >
      <VStack
        padding={8}
        spacing={4}
        borderWidth="1px"
        borderRadius="lg"
        marginX={'auto'}
      >
        {!(userData && userData.isLoggedIn) && (
          <Button
            colorScheme="teal"
            size="sm"
            variant="outline"
            onClick={() => setModalStatus(true)}
          >
            Log In
          </Button>
        )}
        <Box>
          Vaccine Appointment Alert
          <ColorModeSwitcher justifySelf="flex-end" />
        </Box>
        <Box>
          <CardComponent />
        </Box>
        {modalStatus && (
          <LoginModal isOpen={modalStatus} onClose={onModalClose} />
        )}
      </VStack>
      {slotAlerts && slotAlerts.length > 0 && (
        <VStack
          padding={8}
          spacing={4}
          borderWidth="1px"
          borderRadius="lg"
          marginX={'auto'}
        >
          <AlertCards />{' '}
        </VStack>
      )}
    </SimpleGrid>
  );
};

export default PageLayout;
