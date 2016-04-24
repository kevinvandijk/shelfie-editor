import React from 'react';

export default class FileList extends React.Component {
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
      <div>
        { this.state.files
          ? this.state.files.map(file => (
            <li>
              <a onClick={ this.onFileClick }>{ file }</a>
            </li>
          ))
          : <li>Loading filelist...</li>
        }
      </div>
    );
  }
}
