import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LeaderBoard = ({ players }) => {
  if(typeof players === 'undefined') return null;
  return (
    <Wrapper>
      <Title>Top 10 Leader Board:</Title>
      {players.map((player,i) => (
        <Text>{`${i+1}. ${player.name} ${player.wins} games won`}</Text>))}
    </Wrapper>
  )
}

const Title = styled.h3`
`;

const Wrapper = styled.div`
`;

const Text = styled.div`
  font-size: 20px;
`;

LeaderBoard.propTypes = {
  players: PropTypes.array,
}

export default LeaderBoard;
