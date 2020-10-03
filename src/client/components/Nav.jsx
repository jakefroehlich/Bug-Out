import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = ({ session }) => (
  <div className="nav">
<<<<<<< HEAD
    <span>
      Alias:
      <div className="navname">
        {session.name}
      </div>
    </span>
    <div className="dropdown">
      <span>Rules</span>
      <div className="dropdowncontent">
        <p>Each round you will be given a prompt (of selected difficulty) to complete.
          While you do so, you and your competitors will be given powerups randomly.
          Use them to bug your competitors code and race to the finish
          - only first place of each round gets points!
        </p>
      </div>
    </div>
    <div className="dropdown">
      <span>Credit</span>
      <div className="dropdowncontent">
        <p>Bug Out was created by BugOutBrxs LLC (Joe Spicuzza, Sanghyuk Kwon,
          Chad Nuckols, and Jake Froehlich) in partnership with FullStack Academy
          (Special thanks to Eliot, Deanna, and Thompson - 2004FLEX fo lyfe)
        </p>
      </div>
    </div>
=======
    <span>Alias: {session.name}</span>
>>>>>>> parent of bbbee70... modal css complete
    <span>
      <Link to="/login">Login</Link>
    </span>
  </div>
);

const mapStateToProps = ({ session }) => ({ session });

export default connect(mapStateToProps, null)(Nav);
