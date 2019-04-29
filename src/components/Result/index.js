import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Result = ({ message, onStart }) => {
  return (
    <Modal>
        <Wrapper>
            { message }
            <Start onClick={onStart}>Start Over</Start>
        </Wrapper>
    </Modal>
  )
}

const Modal = styled.div`
  position: absolute;
  top:0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: #e2e1e1d4;
  z-index: 1;
  display: flex;
`;
const Wrapper = styled.div`
  min-height: 155px;
  min-width: 250px;
  border-radius: 6px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`;


const Start = styled.button`
  background: #3c7bdb;
  border-radius: 6px;
  color: #fff;
  height: 40px;
  width: 120px;
  font-size: 17px;
  margin-bottom: 15px;
`;

Result.propTypes = {
  message: PropTypes.object,
  onStart: PropTypes.func,
}

export default Result;
