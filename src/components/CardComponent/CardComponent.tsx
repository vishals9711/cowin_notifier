import {
  Box,
  Button,
  Select,
  useToast,
  VStack,
  Checkbox,
  CheckboxGroup,
  HStack,
  Divider,
  Text,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AGE_LIMITS } from '../../constants/ageLimit';
import { STATES } from '../../constants/states';
import UserDataContext from '../../context/UserDataContext';
import { DISTRICT } from '../../models/districts';
import { SLOT_ALERTS } from '../../models/slot';
import { firestore } from '../../services/firebase';
import { getDistrictByState } from '../../services/getDistricts';
import ProfileModal from '../ProfileModal/ProfileModal';
import { returnIfSameSlot } from '../utils/utils';

interface onChange {
  target: {
    value: string;
  };
}

interface STATE_OBJ {
  state_id: number;
  state_name: string;
}

function CardComponent(): React.ReactElement {
  const [currentState, setCurrentState] = useState<STATE_OBJ | null>(null);
  const [districts, setDistricts] = useState<Array<DISTRICT> | null>(null);
  const [currentDistrict, setCurrentDistrict] = useState<DISTRICT | null>(null);
  const [ageCategory, setAgeCategory] = useState<number | null>(null);
  const setSlotAlerts = useContext(UserDataContext)?.setSlotAlerts;
  const slotAlerts = useContext(UserDataContext)?.slotAlerts;
  const userData = useContext(UserDataContext)?.userData;
  const setUserData = useContext(UserDataContext)?.setUserData;
  const ageRef = useRef<HTMLSelectElement | null>(null);
  const stateRef = useRef<HTMLSelectElement | null>(null);
  const distRef = useRef<HTMLSelectElement | null>(null);
  const toast = useToast();
  const [profileModalStatus, setProfileModalStatus] = useState(false);
  const [vaccines, setVaccines] = useState<Array<string>>([
    'COVISHIELD',
    'COVAXIN',
  ]);
  const [fees, setFees] = useState<Array<string>>(['Free', 'Paid']);

  useEffect(() => {
    if (currentState) {
      setDistricts(null);
      getDistrictByState(currentState.state_id)
        .then((data) => {
          setDistricts(data.data.districts);
        })
        .catch((err) =>
          toast({
            title: 'Error occurred',
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        );
    }
  }, [currentState]);

  const createAlert = () => {
    if (ageCategory && currentDistrict && currentState && userData) {
      const obj: SLOT_ALERTS = {
        age_category: ageCategory,
        district_id: currentDistrict.district_id,
        district_name:
          currentDistrict.district_name || currentDistrict.district_name_l,
        state_id: currentState.state_id,
        state_name: currentState.state_name,
        date_created: new Date().getTime(),
        fees,
        vaccine: vaccines,
      };
      if (slotAlerts && slotAlerts.length && setSlotAlerts) {
        if (
          !slotAlerts.find(
            (slot) =>
              slot.age_category === obj.age_category &&
              slot.district_id === obj.district_id &&
              returnIfSameSlot(slot, obj)
          )
        ) {
          setSlotAlerts([...slotAlerts, obj]);
          const userObj = firestore.collection('users').doc(userData.uid);

          userObj
            .update({ alert: [...slotAlerts, obj] })
            .then((data) => {
              console.log('data added!');
              console.log(data);
            })
            .catch((err) => {
              userObj.set({ alert: [...slotAlerts, obj] });
            });
        }
      } else if (setSlotAlerts) {
        setSlotAlerts([obj]);
        const userObj = firestore.collection('users').doc(userData.uid);
        userObj
          .update({ alert: [obj] })
          .then((data) => {
            console.log('data added!');
            console.log(data);
          })
          .catch((err) => {
            userObj.set({ alert: [obj] });
          });
      }
      setAgeCategory(null);
      if (ageRef && ageRef.current) ageRef.current.selectedIndex = 0;
      setCurrentDistrict(null);
      if (distRef && distRef.current) distRef.current.selectedIndex = 0;
      setCurrentState(null);
      if (stateRef && stateRef.current) stateRef.current.selectedIndex = 0;
      toast({
        title: 'Alert Created',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing="24px">
      <Select
        placeholder="Select Age Category"
        onChange={(event: onChange) =>
          setAgeCategory(parseInt(event.target.value))
        }
        ref={ageRef}
      >
        {AGE_LIMITS.map((age, index) => (
          <option value={age.id} key={index} style={{ padding: '1rem' }}>
            {age.label}
          </option>
        ))}
      </Select>
      <Select
        placeholder="Select State"
        onChange={(event: onChange) =>
          setCurrentState(
            STATES.states.find(
              (state) => state.state_id === parseInt(event.target.value)
            ) || null
          )
        }
        ref={stateRef}
      >
        {STATES.states.map((state, index) => (
          <option value={state.state_id} key={index}>
            {state.state_name}
          </option>
        ))}
      </Select>
      {districts && (
        <Select
          placeholder="Select District"
          onChange={(event: onChange) =>
            setCurrentDistrict(
              districts.find(
                (district) =>
                  district.district_id === parseInt(event.target.value)
              ) || null
            )
          }
          ref={distRef}
        >
          {districts.map((district, index) => (
            <option value={district.district_id} key={index}>
              {district.district_name || district.district_name_l}
            </option>
          ))}
        </Select>
      )}
      {!districts && <Select placeholder="Select District" disabled></Select>}
      <Divider orientation="horizontal" />
      <Text>Vaccine</Text>
      <CheckboxGroup
        colorScheme="green"
        defaultValue={['COVISHIELD', 'COVAXIN']}
        onChange={(val: Array<string>) => setVaccines(val)}
      >
        <HStack>
          <Checkbox value="COVISHIELD">Covishield</Checkbox>
          <Checkbox value="COVAXIN">Covaxin</Checkbox>
        </HStack>
      </CheckboxGroup>
      <Divider orientation="horizontal" />
      <Text>Fees</Text>
      <CheckboxGroup
        colorScheme="green"
        defaultValue={['Free', 'Paid']}
        onChange={(val: Array<string>) => setFees(val)}
      >
        <HStack>
          <Checkbox value="Free">Free</Checkbox>
          <Checkbox value="Paid">Paid</Checkbox>
        </HStack>
      </CheckboxGroup>

      {userData && (
        <Button
          colorScheme="teal"
          variant="outline"
          disabled={
            !(
              currentState &&
              currentDistrict &&
              ageCategory &&
              vaccines.length &&
              fees.length
            )
          }
          onClick={createAlert}
        >
          Create Alert
        </Button>
      )}
      {!userData && <Box>Please Login to create alert</Box>}
      {setUserData && setSlotAlerts && userData && profileModalStatus && (
        <ProfileModal
          isOpen={profileModalStatus}
          onClose={() => setProfileModalStatus(false)}
          userData={userData}
          setUserData={setUserData}
          setSlotAlerts={setSlotAlerts}
        />
      )}
    </VStack>
  );
}

export default CardComponent;
