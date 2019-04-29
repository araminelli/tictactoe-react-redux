import React from 'react';
import { connect } from 'react-redux'

import Turn from 'components/Turn';
import Board from 'components/Board';
import LeaderBoard from 'components/LeaderBoard';
import Statistics from 'components/Statistics';


class TicTacToe extends React.Component{

  onPlayerClick(cellId){
    console.log('e',cellId);
    const { board } = this.props;
    if (typeof board[cellId] === 'number') {
			this.turn(cellId);
		}
  }

  turn(cellId) {
		let asSign = this.currentPlayer.getAs();
		// In case first X set startTime
		if (!this.startTime) this.startTime = new Date();
		// update user with new play;
		this.currentPlayer.addPlay(cellId);
		// update board with current player sign
		this.setCell(cellId, asSign);
		// Check if the game is over
		if (this.hasWin() || this.hasTie()) {
			this.setTimeDuration();
			this.gameOver();
		} else {
			// Update the currentPlayer.
			this.alternateTurn();
			// Update text on page.
			this.updateWhoseTurn();
		}
	}

  render(){
    const { board } = this.props;
    console.log(board);
    return(
      <div>
        <Turn></Turn>
        <Board cells={board} playerTurn={this.onPlayerClick}></Board>
        <Statistics></Statistics>
        <LeaderBoard></LeaderBoard>
      </div>
    )
  }
}

const mapToProps = (state) => {
  board: state.board
}

export default connect(mapToProps, null, TicTacToe);
