import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import UserDataContext from '../../context/UserDataContext';
import LoginModal from '../LoginModal/LoginModal';

type IProps = {
  children: React.ReactNode;
};

const Navbar = ({ children }: IProps): React.ReactElement => {
  const userData = useContext(UserDataContext)?.userData;
  const [modalStatus, setModalStatus] = useState(false);
  const onModalClose = () => {
    setModalStatus(false);
  };
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} height={16}>
        <Flex h={16} flexGrow={1}>
          <Flex
            justifySelf={'center'}
            width={'100%'}
            flexDirection={'column'}
            alignContent={'center'}
            margin={'auto'}
          >
            <Text>Vaccine Appointment Alert</Text>
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
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                  >
                    <Avatar size={'sm'} src={userData.photoURL || ''} />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Link 1</MenuItem>
                    <MenuItem>Link 2</MenuItem>
                    <MenuDivider />
                    <MenuItem>Link 3</MenuItem>
                  </MenuList>
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
      <Box p={2}>{children}</Box>
    </>
  );
};

export default Navbar;
