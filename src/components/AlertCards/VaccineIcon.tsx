import { Button } from '@chakra-ui/react';
import React from 'react';
import vaccine from './vaccine.png';
const CowinButton = (): React.ReactElement => {
  return (
    <Button
      leftIcon={
        <img
          src={vaccine}
          height={'32px'}
          width={'32px'}
          alt={'vaccine icon'}
        />
      }
      colorScheme="teal"
      variant="solid"
      as={'a'}
      href={'https://selfregistration.cowin.gov.in/'}
    >
      Open Cowin
    </Button>
  );
};

export default CowinButton;
