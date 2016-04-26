import React from 'react';
import UploadForm from './UploadForm';
import FileList from './FileList';
import VideoCropper from './VideoCropper';

export default class App extends React.Component {
  state = {
    videoUrl: null,
    videoName: null,
  };

  openFile = (file) => {
    this.setState({
      videoUrl: `http://127.0.0.1:3000/uploads/${encodeURIComponent(file)}`,
      videoName: file,
    });
  }

  render() {
    console.log('render', this.state.videoUrl);
    return (
      <div>
        <UploadForm />
        <FileList onFileClick={ this.openFile } />
        { this.state.videoUrl
          ? <VideoCropper name={ this.state.videoName } url={ this.state.videoUrl } />
          : null
        }
      </div>
    );
  }
}
