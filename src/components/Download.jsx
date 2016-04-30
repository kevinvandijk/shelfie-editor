import React, { PropTypes } from 'react';

export default class Download extends React.Component {
  static propTypes = {
    file: PropTypes.string.isRequired,
  };

  state = {
    clicked: false,
  };

  componentDidMount() {
    this.refs.link.click();
  }

  shouldComponentUpdate(nextProps) {
    return this.props.file !== nextProps.file;
  }

  componentDidUpdate() {
    this.refs.link.click();
  }

  onClick = () => {
    this.setState({
      clicked: true,
    });
  }

  render() {
    if (this.state.clicked) return null;

    return <a ref="link" href={ this.props.file } onClick={ this.onClick } download="clip.mp4"></a>;
  }
}
