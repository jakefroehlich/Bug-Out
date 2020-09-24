import { Button } from '@chakra-ui/core';
import React from 'react';

const powerUpButton = (powerUp) => {
  if (powerUp.name === 'Minimize') {
    return (
      <Button
        onClick={() => null}
      > Minimize
      </Button>
    );
  } if (powerUp.name === 'Max Font') {
    return (
      <Button
        onClick={() => null}
      >  Max Font
      </Button>
    );
  } if (powerUp.name === 'Popups') {
    return (
      <Button
        onClick={() => null}
      >  Popups
      </Button>
    );
  }
  return (
    <Button
      onClick={() => null}
    >  PowerUp Not Found
    </Button>
  );
};

export default powerUpButton;
