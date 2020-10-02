/* eslint-disable no-shadow */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getLeaderboardThunk } from '../store/thunks/gameThunks';

const Leaderboard = ({
  game,
  getLeaderboardThunk,
}) => {
  console.log(game);

  useEffect(() => {
    getLeaderboardThunk();
  }, []);

  let rank = 0;
  return (
    <div>
      <div>Leaderboard</div>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {game.leaderboard
            && game.leaderboard.map((pos) => {
              const date = new Date(pos.createdAt).toDateString().slice(4);
              rank += 1;
              return (
                <tr key={pos.id}>
                  <td>{rank}</td>
                  <td>{pos.name}</td>
                  <td>{pos.score}</td>
                  <td>{date}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({
  game,
}) => ({
  game,
});
export default connect(mapStateToProps, { getLeaderboardThunk })(Leaderboard);
