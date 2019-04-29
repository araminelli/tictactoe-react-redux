import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
				<tr key={i} className="row">
					{columns}
				</tr>
			);
		}

		return board;
	}

	renderCell(i) {
		const { symbols, cells, winCombination } = this.props;
    const value = typeof cells[i] === 'number' ? '' : cells[i];
    const color = symbols[value];
    const background = winCombination && winCombination.indexOf(i) > -1 ? '#41f16a' : '';
    return (
			<Cell
				key={i}
        color={color}
        background={background}
				value={value}
				onClick={() => this.props.playerTurn(i)}
			/>
		);
	}

  render() {
    return <Table><tbody>{this.renderGrid(3, 3)}</tbody></Table>;
  }
}

const Table = styled.table`
  flex: 0 0 310px;
  border-collapse: separate;
  border-spacing: 0;
  tr:first-child td{
     border-top: 0.5px solid rgb(154,154,154);
   }
    tr:last-child td{
     border-bottom: 0.5px solid rgb(154,154,154);
   }
    tr td:first-child{
     border-left: 0.5px solid rgb(154,154,154);
   }
    tr td:last-child{
     border-right: 0.5px solid rgb(154,154,154);
   }
    tr:last-child td:last-child {
       border-bottom-right-radius: 6px;
   }
    tr:first-child td:first-child{
       border-top-left-radius: 6px;
   }
    tr:first-child td:last-child{
       border-top-right-radius: 6px;
   }
    tr:last-child td:first-child {
       border-bottom-left-radius: 6px;
   }
    tr:last-child td:last-child {
       border-bottom-right-radius: 6px;
   }
`;

Cell.propTypes = {
  cells: PropTypes.array,
}


export default Board;
