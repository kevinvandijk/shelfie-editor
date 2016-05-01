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
    if (this.state.cutStart) return;
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
    const hasCutStart = typeof cutStart !== 'undefined';
    const hasCutEnd = typeof cutEnd !== 'undefined';

    return (
      <div>
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-primary">
              <div className="panel-heading">{ this.props.name }</div>
              <ReactPlayer
                width="100%"
                url={ this.props.url }
                playing={ playing }
                onProgress={ this.onProgress }
                onEnded={ () => this.setState({ playing: false }) }
                onDuration={ duration => this.setState({ duration }) }
                ref="player"
              />
            </div>
          </div>
        </div>
        <div className="row" style={ { marginBottom: '20px' } }>
          <div className="col-lg-12">
            <input
              type="range"
              min={ 0 }
              max={ 1 }
              step="any"
              value={ played }
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            { typeof output !== 'undefined' &&
              <Download file={ `http://127.0.0.1:3000/${output}` } />
            }
            <div className="btn-group">
              <button className="btn btn-primary" onClick={ this.pause }>
                { playing ? 'Pause' : 'Play' }
              </button>
              <button
                className={ `btn btn-default ${hasCutStart ? 'btn-success' : ''}` }
                onClick={ this.onCutStart }
              >
                Cut{ cutStart ? ` (${cutStart})` : '' }
              </button>
            { hasCutStart &&
              <button
                className={ `btn btn-default ${hasCutEnd ? 'btn-success' : ''}` }
                onClick={ this.onCutEnd }
              >
                Cut{ cutEnd ? ` (${cutEnd})` : '' }
              </button>
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
