import React, { PureComponent } from "react";
import _ from "lodash";
import { Stat } from "./Stat";

export class Board extends PureComponent {
  state = { hitCount: 0, missCount: 0 };
  gametime = 60; //seconds

  startGame = () => {
    this.startTime = Date.now();
    this.interval = setInterval(() => {
      if (!this.state.running) {
        clearInterval(this.interval);
        return;
      }
      const rowPos = Math.floor(Math.random() * this.props.dimension);
      const colPos = Math.floor(Math.random() * this.props.dimension);
      this.setState({ rowPos, colPos });
    }, 1000);

    setTimeout(() => {
      clearInterval(this.interval);
      this.setState({ running: false });
    }, this.gametime * 1000);

    return { rowPos: -1, colPos: -1, hitCount: 0, missCount: 0, running: true };
  };

  handleCellClick = event => {
    event.preventDefault();
    if (!this.state.running) {
      return;
    }
    const cell = event.target;
    if (cell.className === "--mark") {
      this.setState(state => ({ hitCount: state.hitCount + 1 }));
    } else {
      this.setState(state => ({ missCount: state.missCount + 1 }));
    }
  };

  handleStatusClick = event => {
    this.setState(state => {
      if (state.running) {
        return { running: false };
      } else {
        return this.startGame();
      }
    });
  };

  render() {
    const { hitCount, missCount, rowPos, colPos, running } = this.state;
    const dimension = this.props.dimension;
    const timeleft =
      (this.startTime + this.gametime * 1000 - Date.now()) / 1000.0;

    return (
      <div>
        <div id="gamestat">
          <Stat label="Hit Count" value={hitCount} />
          <Stat label="Miss Count" value={missCount} />
        </div>
        <div id="gamestatus">
          <span>{running ? `Running ${timeleft}` : "Stopped"}</span>
          <button onClick={this.handleStatusClick}>
            {running ? "Stop" : "Start"}
          </button>
        </div>
        <table id="gameboard">
          {_.range(dimension).map(row => (
            <tr>
              {_.times(dimension).map(col => (
                <td
                  className={row === rowPos && col === colPos ? "--mark" : null}
                  onClick={this.handleCellClick}
                />
              ))}
            </tr>
          ))}
        </table>
      </div>
    );
  }
}
