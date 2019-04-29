import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Cell = props => (
  <Button onClick={props.onClick}>
    {props.value}
  </Button>
);

const Button = styled.button`
  heigth:100px;
  width:100px;
`;

Cell.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
}

export default Cell;
