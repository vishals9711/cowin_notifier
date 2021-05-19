import React, { useState, useEffect } from 'react';
import { Select, Button, VStack } from '@chakra-ui/react';
import { STATES } from '../../constants/states';
import { DISTRICT } from '../../models/districts';
import { getAvailableSlots } from '../../services/getAvailableSlots';
import { getDistrictByState } from '../../services/getDistricts';
import { AGE_LIMITS } from '../../constants/ageLimit';
import { CENTER_RESPONSE } from '../../models/centerResponse';

interface onChange {
  target: {
    value: string;
  };
}

function CardComponent(): React.ReactElement {
  const [currentState, setCurrentState] = useState<number | null>(null);
  const [districts, setDistricts] = useState<Array<DISTRICT> | null>(null);
  const [currentDistrict, setCurrentDistrict] = useState<number | null>(null);
  const [ageCategory, setAgeCategory] = useState<number | null>(null);
  const [timer, setTimer] = useState<Array<NodeJS.Timer>>([]);
  useEffect(() => {
    if (currentState) {
      setDistricts(null);
      getDistrictByState(currentState).then((data) => {
        setDistricts(data.data.districts);
      });
    }
  }, [currentState]);

  const getSlots = () => {
    timer.forEach(time => clearInterval(time));
    setTimer([]);
    if (currentDistrict && ageCategory) {
      const interval = setInterval(() => {
        getAvailableSlots(currentDistrict).then((data) => {
          const centerWithSessions = getIfSlotExists(data.data, ageCategory);
          if (centerWithSessions && centerWithSessions.length) clearInterval(interval);
        });
      }, 1000);
      setTimer([...timer, interval]);
    }
  }

  const getIfSlotExists = (data: CENTER_RESPONSE, age: number) => {
    const centerWithSessions = data.centers?.map(center => {
      const sessions = center.sessions?.filter(session => session.available_capacity && session.available_capacity > 0 && age >= session.min_age_limit);
      if (sessions?.length)
        return {
          ...center,
          sessions: sessions
        }
      else return null;
    }).filter(center => center);
    return centerWithSessions;
  }

  return (
    <VStack spacing="24px">
      <Select
        placeholder="Select Age Category"
        onChange={(event: onChange) =>
          setAgeCategory(parseInt(event.target.value))
        }
      >
        {AGE_LIMITS.map((age, index) => (
          <option value={age.id} key={index}>
            {age.label}
          </option>
        ))}
      </Select>
      <Select
        placeholder="Select State"
        onChange={(event: onChange) =>
          setCurrentState(parseInt(event.target.value))
        }
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
            setCurrentDistrict(parseInt(event.target.value))
          }
        >
          {districts.map((district, index) => (
            <option value={district.district_id} key={index}>
              {district.district_name || district.district_name_l}
            </option>
          ))}
        </Select>
      )}
      {!districts && <Select placeholder="Select District" disabled></Select>}
      <Button
        colorScheme="teal"
        variant="outline"
        disabled={!(currentState && currentDistrict && ageCategory)}
        onClick={getSlots}
      >
        Create Alert
      </Button>
    </VStack>
  );
}

export default CardComponent;
