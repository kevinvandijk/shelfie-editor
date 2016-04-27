import React, { PropTypes } from 'react';
import ReactPlayer from 'react-player';

export default class VideoCropper extends React.Component {
  static propTypes = {
    url: PropTypes.string,
    name: PropTypes.string,
  };

  state = {
    playing: false,
    played: 0,
  };

  onProgress = (state) => {
    if (!this.state.seeking) {
      this.setState(state);
    }
  }

  onCutStart = () => {
    const { duration, played } = this.state;
    const cutStart = duration * played;
    this.setState({ cutStart });
  }

  onCutEnd = () => {
    const { duration, played } = this.state;
    const cutEnd = duration * played;
    this.setState({
      cutEnd,
      playing: false,
    });
  }

  pause = () => {
    this.setState({
      playing: !this.state.playing,
    });
  }

  render() {
    const { playing, played, cutStart, cutEnd } = this.state;

    return (
      <div>
        <h3>{ this.props.name }</h3>
        <ReactPlayer
          url={ this.props.url }
          playing={ playing }
          onProgress={ this.onProgress }
          onEnded={ () => this.setState({ playing: false }) }
          onDuration={ duration => this.setState({ duration }) }
          ref="player"
        />
        <button onClick={ this.pause }>{ playing ? 'Pause' : 'Play' }</button>
        <button
          onClick={ this.onCutStart }
          disabled={ typeof cutStart !== 'undefined' }
        >
          Cut{ cutStart ? ` (${cutStart})` : '' }
        </button>
        { typeof cutStart !== 'undefined' &&
          <button
            onClick={ this.onCutEnd }
            disabled={ typeof cutEnd !== 'undefined' }
          >
            Cut{ cutEnd ? ` (${cutEnd})` : '' }
          </button>
        }
        <input
          type="range"
          min={ 0 }
          max={ 1 }
          step="any"
          value={ played }
        />
      </div>
    );
  }
}
