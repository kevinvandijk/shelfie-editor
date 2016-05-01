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
        <div className="row">
          { this.state.uploadStatus === 'success' &&
            <div className="col-lg-12">
              <div className="alert alert-success">Upload successful</div>
            </div>
          }
          { this.state.uploadStatus === 'error' &&
            <strong>OHNOES it went wrong</strong>
          }
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="panel panel-primary">
              <div className="panel-heading">Upload a video</div>
              <Dropzone onDrop={ this.onDrop }>
                <div>Drag and drop a video to upload</div>
              </Dropzone>
            </div>
          </div>
          <div className="col-lg-6">
            { this.state.files &&
              <div className="panel panel-info">
                <div className="panel-heading">Files to upload:</div>
                <ul className="list-group">
                  {
                    this.state.files.map(file =>
                      <li className="list-group-item" key={ file.name }>{ file.name }</li>
                    )
                  }
                </ul>
                <div className="panel-footer">
                  <button className="btn btn-primary" onClick={ this.onSubmit }>Upload</button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default UploadForm;
