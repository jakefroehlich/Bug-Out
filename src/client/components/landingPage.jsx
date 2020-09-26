/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import {
//   Button, FormControl, Text, Box, Input,
// } from '@chakra-ui/core';
import {
  // getCurrentGaeThunk,
  // findRandomGameThunk,
  updateNameThunk,
  setSessionThunk,
  // makeHostThunk,
  // updateGameCodeThunk,
} from '../store/thunks';
// import { updateAlias } from '../store/actions';

const LandingPage = ({
  session,
  setSession,
  updateUserAlias,
  history,
}) => {
  const [alias, setAlias] = useState('Guest');

  console.log('session', session);
  console.log('alias', alias);

  useEffect(() => {
    setSession();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserAlias(alias);
    history.push('/console');
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      <div className="landing">
        <div
          className="landingform"
        >
          <img className="landingimg" src="https://i.ibb.co/MDgDr1N/Bug-Out-Logo.png" alt="BugOut" />
          <input
            className="landingInput"
            type="text"
            // value={alias}
            placeholder="Enter Preferred Alias"
            onChange={(e) => setAlias(e.target.value)}
          />
        </div>
      </div>
    </form>
  );

  // return (
  //   <div style={{ display: 'flex', flexDirection: 'column' }}>
  //     <div
  //       style={{
  //         textAlign: 'center',
  //         display: 'flex',
  //         justifyContent: 'center',
  //       }}
  //     >
  //       <Box
  //         w="100%"
  //         bg="#14122b"
  //         p={5}
  //         borderWidth="3px"
  //         borderColor="#6b60eb"
  //         borderStyle="solid"
  //         maxW="sm"
  //         rounded="lg"
  //       >
  //         <Text fontSize="6xl" color="white">
  //           Bug Out!
  //         </Text>
  //         <FormControl>
  //           <Input
  //             placeholder="Enter your name to play"
  //             type="text"
  //             value={name}
  //             onChange={(e) => setName(e.target.value)}
  //           />
  //           <Button
  //             width="200px"
  //             variantColor="red"
  //             margin="5px"
  //             onClick={async () => {
  //               await findRandomGame(game.id);
  //             }}
  //             isDisabled={name === ''}
  //           >
  //             Join Random Room
  //           </Button>
  //           <Button
  //             width="200px"
  //             variantColor="orange"
  //             margin="5px"
  //             onClick={() => {
  //               updateName(name);
  //               history.push('/join');
  //               setName('');
  //             }}
  //             isDisabled={name === ''}
  //           >
  //             Join Game
  //           </Button>
  //         </FormControl>
  //         <Button
  //           width="200px"
  //           variantColor="yellow"
  //           margin="5px"
  //           onClick={() => {
  //             socket.emit('joinGame', game.code);
  //             if (name === '' && noName === true) {
  //               setNoName(true);
  //             } else {
  //               updateName(name)
  //                 .then(() => {
  //                   makeHost();
  //                   setName('');
  //                   history.push('/create');
  //                 });
  //             }
  //           }}
  //           isDisabled={name === ''}
  //         >
  //           Create Game
  //         </Button>
  //         <Button
  //           width="200px"
  //           variantColor="green"
  //           margin="5px"
  //           onClick={() => history.push('/login')}
  //           isDisabled={name === ''}
  //         >
  //           Login
  //         </Button>
  //         <Button
  //           width="200px"
  //           variantColor="purple"
  //           margin="5px"
  //           onClick={() => history.push('/howtoplay')}
  //         >
  //           How To Play
  //         </Button>
  //       </Box>
  //     </div>
  //   </div>
  // );
};

const mapStateToProps = ({
  user, game, session,
}) => ({
  user, game, session,
});

const mapDispatchToProps = (dispatch) => ({
  // getCurrentGame: () => dispatch(getCurrentGameThunk()),
  setSession: () => dispatch(setSessionThunk()),
  // findRandomGame: (currentGameId) => dispatch(findRandomGameThunk(currentGameId)),
  // updateName: (name) => dispatch(updateNameThunk(name)),
  // removePlayer: (player) => dispatch(rmPlayer(player)),
  // makeHost: () => dispatch(makeHostThunk()),
  // generateCode: (code) => dispatch(updateGameCodeThunk(code)),
  updateUserAlias: (alias) => dispatch(updateNameThunk(alias)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

// I made this one tonight
