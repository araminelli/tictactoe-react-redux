import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class Players extends React.Component {
	state = {
		player1: 'player1',
    player2: 'player2',
	};

	componentDidMount() {
		this._input.focus();
	}

	onClick(e) {
		const { onStart } = this.props;
    const { player1, player2 } = this.state;
		onStart(player1,player2);
	}

	render() {
		const { player1, player2 } = this.state;
		return (
			<Modal>
				<Wrapper>
					<Title>Tic-Tac-Toe!</Title>
					<Input
						ref={i => (this._input = i)}
						placeholder="Player1"
						value={player1}
						onChange={e => this.setState({ player1: e.target.value })}
					/>
					<Input placeholder="Player2" value={player2}
            onChange={e => this.setState({ player2: e.target.value })}/>
					<Start onClick={this.onClick.bind(this)}>Start Over</Start>
				</Wrapper>
			</Modal>
		);
	}
}

const Modal = styled.div`
	position: absolute;
	top: 0;
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

const Input = styled.input`
	margin: 8px 0;
`;

const Title = styled.h3``;

const Start = styled.button`
	background: #3c7bdb;
	border-radius: 6px;
	color: #fff;
	height: 40px;
	width: 120px;
	font-size: 17px;
	margin-bottom: 15px;
`;

Players.propTypes = {
	onStart: PropTypes.func,
};

export default Players;
