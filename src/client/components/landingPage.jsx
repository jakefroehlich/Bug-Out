/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { connect } from 'react-redux';

const LandingPage = () => {
  const [name, setName] = useState('Guest')

  return (
    <div>
      <div>
        <h1>Bug Out!</h1>
        <p>Explanations</p>
      </div>
      <div>
        <label>
          Name:
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <button
          type='button'
          onClick={() => null}
        >
          Join Game
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, null)(LandingPage); 