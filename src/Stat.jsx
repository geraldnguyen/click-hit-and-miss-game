import React, { PureComponent } from "react";

export class Stat extends PureComponent {
  render() {
    const { label, value } = this.props;

    return (
      <div className="stat">
        <span>{label}: </span>
        <span>{value}</span>
      </div>
    );
  }
}
