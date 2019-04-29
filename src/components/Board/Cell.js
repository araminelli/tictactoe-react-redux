import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Cell = props => (
  <Space color={props.color} background={props.background} onClick={props.onClick}>
    {props.value}
  </Space>
);

const Space = styled.td`
  border: 1px solid rgb(154,154,154);
  height: 100px;
  width: 100px;
  text-align: center;
  font-size: 40px;
  color: ${props => props.color}
  background: ${props => props.background}
`;

Cell.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
}

export default Cell;
