import React, { PropTypes } from 'react';
import ReactPlayer from 'react-player';
import Download from './Download';

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

  onCutEnd = async () => {
    const { duration, played, cutStart } = this.state;
    const cutEnd = duration * played;
    this.setState({
      cutEnd,
      playing: false,
    });

    const result = await (await fetch('http://127.0.0.1:3000/cut', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cutStart,
        cutEnd,
        file: this.props.name,
      }),
    })).json();

    this.setState({
      output: result.output,
    });
  }

  pause = () => {
    this.setState({
      playing: !this.state.playing,
    });
  }

  render() {
    const { playing, played, cutStart, cutEnd, output } = this.state;

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
          >
            Cut{ cutEnd ? ` (${cutEnd})` : '' }
          </button>
        }
        { typeof output !== 'undefined' &&
          <Download file={ `http://127.0.0.1:3000/${output}` } />
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
