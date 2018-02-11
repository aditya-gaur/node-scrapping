import React, { Component } from "react";

class Card extends Component {
  render() {
    const { content, keywords } = this.props;
    return (
      <div className="row">
        <div className="card-wrapper col-sm-10">
          <div className="card">
            <div className="card-body">
              <p className="card-text">{content}</p>
            </div>
            <div className="card-footer text-muted">
              {keywords.map((obj, innerIndex) => (
                <button key={innerIndex} type="button" className="btn btn-info">
                  {obj.key}&nbsp;&nbsp;<span className="badge badge-pill badge-dark">
                    {obj.frequency}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
