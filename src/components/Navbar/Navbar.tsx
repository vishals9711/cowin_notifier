import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import UserDataContext from '../../context/UserDataContext';
import LoginModal from '../LoginModal/LoginModal';
import ProfileModal from '../ProfileModal/ProfileModal';

type IProps = {
  children: React.ReactNode;
};

const Navbar = ({ children }: IProps): React.ReactElement => {
  const userData = useContext(UserDataContext)?.userData;
  const setUserData = useContext(UserDataContext)?.setUserData;
  const setSlotAlerts = useContext(UserDataContext)?.setSlotAlerts;
  const [modalStatus, setModalStatus] = useState(false);
  const onModalClose = () => {
    setModalStatus(false);
  };
  const [profileModalStatus, setProfileModalStatus] = useState(false);

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={2} height={16}>
        <Flex h={16} flexGrow={1}>
          <Flex
            justifySelf={'center'}
            flexDirection={'column'}
            alignContent={'center'}
            margin={'auto'}
          >
            <Text fontSize={'1em'}>Vaccine Appointment Alert</Text>
          </Flex>
          <Flex alignItems={'center'}>
            <Menu>
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
              {userData && userData.isLoggedIn && (
                <>
                  <Button
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    onClick={() => {
                      setProfileModalStatus(true);
                    }}
                  >
                    <Avatar size={'sm'} src={userData.photoURL || ''} />
                  </Button>
                </>
              )}
              <ColorModeSwitcher />
            </Menu>
          </Flex>
        </Flex>
      </Box>
      {modalStatus && (
        <LoginModal isOpen={modalStatus} onClose={onModalClose} />
      )}
      {profileModalStatus && userData && setSlotAlerts && (
        <ProfileModal
          isOpen={profileModalStatus}
          onClose={() => setProfileModalStatus(false)}
          userData={userData}
          setUserData={setUserData}
          setSlotAlerts={setSlotAlerts}
        />
      )}
      <Box p={2}>{children}</Box>
    </>
  );
};

export default Navbar;
