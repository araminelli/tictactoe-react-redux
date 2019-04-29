import React from 'react';
import Cell from './Cell';

class Board extends React.Component {

  renderGrid(row, col) {
		const board = [];
		let cellCounter = 0;
		for (let i = 0; i < row; i += 1) {
			const columns = [];
			for (let j = 0; j < col; j += 1) {
				columns.push(this.renderCell(cellCounter++));
			}
			board.push(
				<div key={i} className="row">
					{columns}
				</div>
			);
		}

		return board;
	}

	renderCell(i) {
		const statusClass = ''

		return (
			<Cell
				statusClass={statusClass}
				key={i}
				value={this.props.cells[i]}
				onClick={() => this.props.playerTurn(i)}
			/>
		);
	}

  render() {
    return <div>{this.renderGrid(3, 3)}</div>;
  }
  //
	// render() {
	// 	return (
	// 		<table className="board col" id="board">
	// 			<tr>
	// 				<td id="0" />
	// 				<td id="1" />
	// 				<td id="2" />
	// 			</tr>
	// 			<tr>
	// 				<td id="3" />
	// 				<td id="4" />
	// 				<td id="5" />
	// 			</tr>
	// 			<tr>
	// 				<td id="6" />
	// 				<td id="7" />
	// 				<td id="8" />
	// 			</tr>
	// 		</table>
	// 	);
	// }
}

export default Board;
