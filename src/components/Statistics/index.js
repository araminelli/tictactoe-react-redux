import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Statistics = ({ players, fastestTime, slowestTime}) => {
  if(typeof players === 'undefined') return null;
  return (
    <Wrapper>
      <Title>Game statistics:</Title>
      {players.map((player,i) => (
        <Text>{`${i+1}. ${player.name} (${player.symbol}) ${player.wins} games won`}</Text>))}
      {slowestTime && fastestTime && <Times>{`Fastest Time: ${fastestTime} Slowest Time ${slowestTime}`}</Times>}
    </Wrapper>
  )
}

const Title = styled.h3`
  margin-top:0;
`;

const Wrapper = styled.div`
`;

const Text = styled.div`
  font-size: 20px;
`;

const Times = styled.div`
  font-size: 20px;
  margin-top: 8px;
`;

Statistics.propTypes = {
  players: PropTypes.array,
}

export default Statistics;
