import { Box, Button, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import UserDataContext from '../../context/UserDataContext';
import { auth } from '../../services/firebase';
import CardComponent from '../CardComponent/CardComponent';
import LoginModal from '../LoginModal/LoginModal';
const PageLayout = (): React.ReactElement => {
  const [modalStatus, setModalStatus] = useState(false);
  const setUserData = useContext(UserDataContext)?.setUserData;
  const userData = useContext(UserDataContext)?.userData;
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
      }
    });
  }, [setUserData]);

  return (
    <VStack
      padding={8}
      spacing={4}
      borderWidth="1px"
      borderRadius="lg"
      marginX={'auto'}
    >
      {console.log(userData)}
      {console.log(!(userData && userData.isLoggedIn))}
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
  );
};

export default PageLayout;
