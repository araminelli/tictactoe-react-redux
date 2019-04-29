import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { turn, reset } from 'actions/game';

import TurnHeader from 'components/TurnHeader';
import Board from 'components/Board';
import Result from 'components/Result';
import LeaderBoard from 'components/LeaderBoard';
import Statistics from 'components/Statistics';

class TicTacToe extends React.Component {
	onPlayerClick(cellId) {
		const { board, currentPlayer, gameOver } = this.props.game;
		if (typeof board[cellId] === 'number' && !gameOver) {
			this.props.turn(currentPlayer, cellId);
		}
	}

	onStartOver() {
		this.props.reset();
	}

	render() {
		const {
			board,
			players,
			currentPlayer,
			symbols,
			winCombination,
			gameOver,
			timeDuration,
			slowestTime,
			fastestTime,
		} = this.props.game;

		var message = null;
		var currentPlayerObject = players[currentPlayer];
		if (winCombination) {
			message = (
				<Message>{`${
					currentPlayerObject.symbol
				} player won in ${timeDuration}s!`}</Message>
			);
		} else {
			message = <Message>Draw!</Message>;
		}

		return (
			<Content>
				<Title>Tic-Tac-Toe!</Title>
				<TurnHeader player={currentPlayerObject} />
				{gameOver && (
					<Result message={message} onStart={this.onStartOver.bind(this)} />
				)}
				<Container>
					<VBox>
						<Board
							winCombination={winCombination}
							symbols={symbols}
							cells={board}
							playerTurn={this.onPlayerClick.bind(this)}
						/>
					</VBox>
					<VBox>
						<Statistics
							players={players}
							fastestTime={fastestTime}
							slowestTime={slowestTime}
						/>
            {/*<LeaderBoard players={players} />*/}
					</VBox>
				</Container>
			</Content>
		);
	}
}

const Title = styled.div`
	margin: 22px 0;
`;

const Content = styled.div`
	width: 800px;
	margin: auto;
	text-align: left;
`;
const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
`;
const VBox = styled.div`
	flex: 1;
`;

const Message = styled.div`
	font-size: 21px;
	margin-bottom: 30px;
	color: ${props => props.color};
`;

const mapStateToProps = (state, ownProps) => {
	return {
		game: state.game.toJS(),
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		turn: (currentPlayer, cellId) => dispatch(turn(currentPlayer, cellId)),
		reset: () => dispatch(reset()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TicTacToe);
