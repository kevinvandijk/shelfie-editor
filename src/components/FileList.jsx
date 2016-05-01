import React, { PropTypes } from 'react';

export default class FileList extends React.Component {
  static propTypes = {
    onFileClick: PropTypes.func,
  };

  state = {
    files: null,
  };

  async componentWillMount() {
    const files = await (await fetch('http://127.0.0.1:3000/list')).json();
    this.setState({
      files,
    });
  }

  render() {
    return (
      <div className="list-group">
        <div className="list-group-item">
          <h4 className="list-group-item-heading">File list</h4>
        </div>
        { this.state.files
          ? this.state.files.map(file => {
            const clickHandler = this.props.onFileClick.bind(this, file);
            return (
              <a href="#" key={ file } className="list-group-item" onClick={ clickHandler }>
                { file }
              </a>
            );
          })
          : <li>Loading filelist...</li>
        }
      </div>
    );
  }
}
