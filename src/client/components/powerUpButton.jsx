import { Button } from '@chakra-ui/core';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const powerUpButton = (powerUp) => {
  if (powerUp.name === 'Minimize') {
    return (
      <Button
        key={uuidv4()}
        className="powerUpButton"
        onClick={() => null}
      > Minimize
      </Button>
    );
  } if (powerUp.name === 'Max Font') {
    return (
      <Button
        key={uuidv4()}
        className="powerUpButton"
        onClick={() => null}
      >  Max Font
      </Button>
    );
  } if (powerUp.name === 'Popups') {
    return (
      <Button
        key={uuidv4()}
        className="powerUpButton"
        onClick={() => null}
      >  Popups
      </Button>
    );
  }
  return (
    <Button
      key={uuidv4()}
      onClick={() => null}
    >  PowerUp Not Found
    </Button>
  );
};

export default powerUpButton;
