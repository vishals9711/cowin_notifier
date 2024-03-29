import {
  Box,
  Button,
  // HStack,
  // Input,
  // InputGroup,
  // InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  // PinInput,
  // PinInputField,
  useToast,
  VStack,
} from '@chakra-ui/react';
import firebase from 'firebase';
import React, { Dispatch, SetStateAction } from 'react';
import { SLOT_ALERTS } from '../../models/slot';
import { USER_DATA } from '../../models/userData';
// import { auth, firestore } from '../../services/firebase';
interface IModal {
  isOpen: boolean;
  onClose: () => void;
  userData: USER_DATA;
  setUserData: Dispatch<SetStateAction<USER_DATA | null>> | undefined;
  setSlotAlerts: Dispatch<SetStateAction<Array<SLOT_ALERTS>>>;
}

export default function ProfileModal(props: IModal): React.ReactElement {
  const { isOpen, onClose, setUserData, setSlotAlerts } = props;
  // const [alertsBool, setAlertsBool] = useState(false);
  // const [phoneNumber, setPhoneNumber] = useState('');
  // const [formDirty, setFormDirty] = useState(false);
  // const [buttonRef, setRef] = useState<HTMLInputElement | null>(null);
  // const [
  //   confirmation,
  //   setConfirmation,
  // ] = useState<firebase.auth.ConfirmationResult | null>(null);
  // const [otp, setOTP] = useState('');
  const toast = useToast();
  // useEffect(() => {
  //   if (userData && userData.mobile_number) setAlertsBool(true);
  // }, [userData]);
  // useEffect(() => {
  //   if (buttonRef && !window.recaptchaVerifier) {
  //     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
  //       buttonRef,
  //       {
  //         size: 'invisible',
  //       },
  //       app
  //     );
  //     window.recaptchaVerifier.render();
  //   }
  // }, [buttonRef]);

  // const getOTP = () => {
  //   const appVerifier = window.recaptchaVerifier;
  //   auth.currentUser
  //     ?.linkWithPhoneNumber(phoneNumber, appVerifier)
  //     .then((confirmationResult) => {
  //       // SMS sent. Prompt user to type the code from the message, then sign the
  //       // user in with confirmationResult.confirm(code).
  //       setConfirmation(confirmationResult);
  //       toast({
  //         title: 'OTP Sent',
  //         status: 'success',
  //         duration: 5000,
  //         isClosable: true,
  //       });
  //       // ...
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       toast({
  //         title: 'Error Occured',
  //         description: 'Please try again',
  //         status: 'error',
  //         duration: 5000,
  //         isClosable: true,
  //       });
  //     });
  // };

  // const submitOTP = () => {
  //   if (confirmation) {
  //     confirmation
  //       .confirm(otp)
  //       .then((result) => {
  //         const userObj = firestore.collection('users').doc(userData.uid);

  //         userObj
  //           .update({ mobile_number: phoneNumber })
  //           .then((respData) => {
  //             toast({
  //               title: 'Mobile Number Linked',
  //               description: 'Stay tuned for text alerts',
  //               status: 'success',
  //               duration: 5000,
  //               isClosable: true,
  //             });
  //             if (setUserData)
  //               setUserData({ ...userData, mobile_number: phoneNumber });
  //             onClose();
  //           })
  //           .catch((err) => {
  //             userObj
  //               .set({ mobile_number: phoneNumber })
  //               .then(() => {
  //                 toast({
  //                   title: 'Mobile Number Linked',
  //                   description: 'Stay tuned for text alerts',
  //                   status: 'success',
  //                   duration: 5000,
  //                   isClosable: true,
  //                 });
  //                 if (setUserData)
  //                   setUserData({ ...userData, mobile_number: phoneNumber });
  //                 onClose();
  //               })
  //               .catch(() => {
  //                 toast({
  //                   title: 'Error Occured',
  //                   description: 'Please try again',
  //                   status: 'error',
  //                   duration: 5000,
  //                   isClosable: true,
  //                 });
  //               });
  //           });
  //       })
  //       .catch((error) => {
  //         toast({
  //           title: 'Incorrect OTP',
  //           description: 'Please try again',
  //           status: 'error',
  //           duration: 5000,
  //           isClosable: true,
  //         });
  //       });
  //   }
  // };

  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        if (setUserData && setSlotAlerts) {
          setUserData(null);
          setSlotAlerts([]);
          toast({
            title: 'Log Out successful',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        toast({
          title: 'Error Occured',
          description: 'Please try again',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size={'xs'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader py={2} textAlign={'center'}>
            Profile
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={4}>
            {/* <HStack
              padding={4}
              spacing={4}
              borderWidth="1px"
              borderRadius="lg"
              marginX={'auto'}
            >
              <Avatar size={'xl'} src={userData.photoURL || ''} />
              <VStack spacing="16px" minWidth={'120px'} flexGrow={1}>
                <Heading as="h4" size="md" fontSize={'1.3em'}>
                  {userData.displayName}
                </Heading>
                <Flex alignItems={'center'}>
                  <Text fontSize={'1.1em'}>Enable Text Alerts</Text>
                  <Switch
                    marginLeft={6}
                    size="lg"
                    onChange={(evnt) => setAlertsBool(evnt.target.checked)}
                    isChecked={alertsBool}
                  />
                </Flex>
              </VStack>
            </HStack> */}
            {/* {alertsBool && !userData.mobile_number && (
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
                      // ref={(ref) => setRef(ref)}
                    />
                  </InputGroup>
                  <Button disabled={phoneNumber.length !== 13} onClick={getOTP}>
                    Generate OTP
                  </Button>
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
            )} */}
            <Box
              padding={4}
              spacing={4}
              marginTop={4}
              borderWidth="1px"
              borderRadius="lg"
            >
              <VStack>
                <Button onClick={logOut}>Log Out</Button>
              </VStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
