import React from 'react';
import Dropzone from 'react-dropzone';

class UploadForm extends React.Component {
  state = {
    files: null,
  };

  onDrop = (files) => {
    const prevFiles = this.state.files || [];
    this.setState({
      files: prevFiles.concat(files),
    });
  }

  onSubmit = async () => {
    const { files } = this.state;

    const data = new FormData();
    files.map((file) => data.append('file', file));

    try {
      const response = await fetch('http://127.0.0.1:3000/upload', {
        method: 'POST',
        body: data,
      });

      this.setState({
        uploadStatus: 'success',
        files: null,
      });

      if (response.status !== 200) throw new Error('Something went wrong');
    } catch (err) {
      this.setState({
        uploadStatus: 'error',
      });

      throw err;
    }
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
        { this.state.uploadStatus === 'success' &&
          <strong>Done</strong>
        }
        { this.state.uploadStatus === 'error' &&
          <strong>OHNOES it went wrong</strong>
        }
      </div>
    );
  }
}

export default UploadForm;
