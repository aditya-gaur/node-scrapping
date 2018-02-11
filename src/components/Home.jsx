import React, { Component } from "react";
import { connect } from "react-redux";

import Card from "./Card";
import { scrapeData } from "../actions/scrapeActions";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      showLoader: false
    };
  }

  componentWillMount() {
    const { scrapedData } = this.props;
    this.setState({ records: scrapedData });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.scrapedData.length > 0) {
      this.setState({ records: newProps.scrapedData, showLoader: false });
    }
  }

  handleScrapeCall() {
    this.setState({showLoader: true})
    this.props.scrapeData();
  }

  render() {
    const { records, showLoader } = this.state;

    return (
      <div>
        <div className="col-md-12 text-center scrape-btn-wrapper">
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => this.handleScrapeCall()}
          >
            Scrape It {showLoader && <i className="fa fa-circle-o-notch fa-spin fa-fw"></i>}
          </button>
        </div>
        {records.map((rec, index) => (
          <Card content={rec.content} keywords={rec.keywords} key={index} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  scrapedData: state.scrape
});

const mapDispatchToProps = dispatch => ({
  scrapeData: () => dispatch(scrapeData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
