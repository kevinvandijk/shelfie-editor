import React from 'react';
import Dropzone from 'react-dropzone';

class App extends React.Component {
  state = {
    files: null,
  };

  onDrop = (files) => {
    const prevFiles = this.state.files || [];
    this.setState({
      files: prevFiles.concat(files),
    });
  }

  render() {
    return (
      <div>
        <Dropzone onDrop={ this.onDrop }>
          <div>Drop a video to upload</div>
        </Dropzone>
        { this.state.files &&
          <div>
            <h2>Files:</h2>
            <ul>
              { this.state.files.map(file => <li>{ file.name }</li>) }
            </ul>
            <button onClick={ this.onSubmit }>Upload</button>
          </div>
        }
      </div>
    );
  }
}

export default App;
