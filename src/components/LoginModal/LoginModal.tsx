import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { FaGoogle, FaFacebookSquare, FaTwitter } from 'react-icons/fa';
import app, {
  auth,
  facebookAuthProvider,
  firestore,
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
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formDirty, setFormDirty] = useState(false);
  const [buttonRef, setRef] = useState<HTMLInputElement | null>(null);
  const [
    confirmation,
    setConfirmation,
  ] = useState<firebase.auth.ConfirmationResult | null>(null);
  const [otp, setOTP] = useState('');

  useEffect(() => {
    if (buttonRef && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        buttonRef,
        {
          size: 'invisible',
        },
        app
      );
      window.recaptchaVerifier.render();
    }
  }, [buttonRef]);

  const getOTP = () => {
    console.log('-------');
    const appVerifier = window.recaptchaVerifier;
    auth
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        console.log(confirmationResult);
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        setConfirmation(confirmationResult);
        toast({
          title: 'OTP Sent',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        // ...
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: 'Error Occured',
          description: 'Please try again',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const submitOTP = () => {
    if (confirmation) {
      confirmation
        .confirm(otp)
        .then((result) => {
          if (result && result.user) {
            const { uid } = result.user;
            const userObj = firestore.collection('users').doc(uid);
            userObj.update({ mobile_number: phoneNumber });
          }
          toast({
            title: 'Mobile Number Linked',
            description: 'Stay tuned for text alerts',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          onClose();
        })
        .catch((error) => {
          toast({
            title: 'Incorrect OTP',
            description: 'Please try again',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        });
    }
  };

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
    <Text display="flex" justifyContent="center" p={2} fontSize={'1.1em'}>
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
                  fontSize={'1.1em'}
                  variant="ghost"
                  aria-label="Sign in with Google"
                  icon={<FaGoogle />}
                  onClick={() => oAuthSignIn(googleAuthProvider)}
                />
                <IconButton
                  fontSize={'1.1em'}
                  variant="ghost"
                  aria-label="Sign in with Facebook"
                  icon={<FaFacebookSquare />}
                  onClick={() => oAuthSignIn(facebookAuthProvider)}
                />
                <IconButton
                  fontSize={'1.1em'}
                  variant="ghost"
                  aria-label="Sign in with Twitter"
                  icon={<FaTwitter />}
                  onClick={() => oAuthSignIn(twitterAuthProvider)}
                />
              </HStack>

              {
                <Box
                  padding={4}
                  spacing={4}
                  marginTop={4}
                  borderWidth="1px"
                  borderRadius="lg"
                >
                  <VStack spacing={4}>
                    <InputGroup>
                      <InputLeftAddon>{'+91'}</InputLeftAddon>
                      <Input
                        type="tel"
                        placeholder="Phone Number"
                        onChange={(event) => {
                          setPhoneNumber(`+91${event.target.value}`);
                          setFormDirty(true);
                        }}
                        isInvalid={formDirty && phoneNumber.length !== 13}
                        errorBorderColor="crimson"
                        ref={(ref) => setRef(ref)}
                      />
                    </InputGroup>
                    {!confirmation && (
                      <Button
                        disabled={phoneNumber.length !== 13}
                        onClick={getOTP}
                      >
                        Generate OTP
                      </Button>
                    )}
                    {confirmation && (
                      <Button
                        disabled={phoneNumber.length !== 13}
                        onClick={() => {
                          getOTP();
                          setOTP('');
                        }}
                      >
                        Resend OTP
                      </Button>
                    )}
                    {confirmation && (
                      <>
                        <HStack>
                          <PinInput otp onChange={(value) => setOTP(value)}>
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                          </PinInput>
                        </HStack>
                        <Button disabled={otp.length !== 6} onClick={submitOTP}>
                          Submit
                        </Button>
                      </>
                    )}
                  </VStack>
                </Box>
              }
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
