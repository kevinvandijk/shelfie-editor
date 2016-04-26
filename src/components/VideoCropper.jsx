import React, { PropTypes } from 'react';
import ReactPlayer from 'react-player';

export default class VideoCropper extends React.Component {
  static propTypes = {
    url: PropTypes.string,
    name: PropTypes.string,
  };

  render() {
    return (
      <div>
        <h3>{ this.props.name }</h3>
        <ReactPlayer url={ this.props.url } playing />
      </div>
    );
  }
}
