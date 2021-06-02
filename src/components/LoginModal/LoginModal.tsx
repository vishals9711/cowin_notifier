import {
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import firebase from 'firebase';
import React from 'react';
import { FaFacebookSquare, FaGoogle, FaTwitter } from 'react-icons/fa';
import {
  auth,
  facebookAuthProvider,
  googleAuthProvider,
  twitterAuthProvider,
} from '../../services/firebase';

interface IModal {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal(props: IModal): React.ReactElement {
  const { isOpen, onClose } = props;
  const toast = useToast();

  // const [buttonRef, setRef] = useState<HTMLButtonElement | null>(null);
  const oAuthSignIn = (provider: firebase.auth.AuthProvider) => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        toast({
          title: 'Login successful',
          description: 'Continue to create your alert',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        onClose();
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
  };

  const middleText = (text: string) => (
    <Text display="flex" justifyContent="center" p={2} fontSize={'20px'}>
      {text}
    </Text>
  );

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size={'sm'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader py={2}>Sign in to Vaccine Notifier</ModalHeader>
          <ModalCloseButton />
          <ModalBody py={4}>
            <VStack
              padding={4}
              spacing={4}
              borderWidth="1px"
              borderRadius="lg"
              marginX={'auto'}
            >
              {middleText('Log in to create alerts.')}
              <HStack>
                <IconButton
                  fontSize="24px"
                  variant="ghost"
                  aria-label="Sign in with Google"
                  icon={<FaGoogle />}
                  onClick={() => oAuthSignIn(googleAuthProvider)}
                />
                <IconButton
                  fontSize="24px"
                  variant="ghost"
                  aria-label="Sign in with Facebook"
                  icon={<FaFacebookSquare />}
                  onClick={() => oAuthSignIn(facebookAuthProvider)}
                />
                <IconButton
                  fontSize="24px"
                  variant="ghost"
                  aria-label="Sign in with Twitter"
                  icon={<FaTwitter />}
                  onClick={() => oAuthSignIn(twitterAuthProvider)}
                />
                {/* <IconButton
                  fontSize="24px"
                  variant="ghost"
                  aria-label="Sign in with Phone Number"
                  icon={<FaPhoneAlt />}
                  ref={(ref) => setRef(ref)}
                /> */}
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
