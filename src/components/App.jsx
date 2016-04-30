import React from 'react';
import UploadForm from './UploadForm';
import FileList from './FileList';
import VideoCropper from './VideoCropper';

export default class App extends React.Component {
  state = {
    page: 'upload',
    videoUrl: null,
    videoName: null,
  };

  openFile = (file) => {
    this.setState({
      videoUrl: `http://127.0.0.1:3000/uploads/${encodeURIComponent(file)}`,
      videoName: file,
      page: 'video',
    });
  }

  render() {
    const { page } = this.state;

    return (
      <div>
        <nav className="navbar navbar-default">
          <ul className="nav navbar-nav">
            <li><a href="#" onClick={ () => this.setState({ page: 'upload' }) }>Upload</a></li>
            <li><a href="#" onClick={ () => this.setState({ page: 'files' }) }>File list</a></li>
          </ul>
        </nav>
        { page === 'upload' &&
          <div className="container">
            <h2>Upload</h2>
            <UploadForm />
          </div>
        }

        { page === 'files' &&
          <div className="container">
            <h2>Files</h2>
            <FileList onFileClick={ this.openFile } />
          </div>
        }

        { page === 'video' && this.state.videoUrl
          ? <VideoCropper name={ this.state.videoName } url={ this.state.videoUrl } />
          : null
        }
      </div>
    );
  }
}
