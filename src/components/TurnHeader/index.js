import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TurnHeader = ({ player }) => (
  <Text color={player.color}>{`${player.symbol} player turn`}</Text>
)

const Text = styled.div`
  color: ${props => props.color}
  margin: 22px 0;
`;

TurnHeader.propTypes = {
  player: PropTypes.object,
}

export default TurnHeader;
