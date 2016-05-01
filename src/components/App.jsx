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
          <div className="navbar-header">
            <span className="navbar-brand">Shelfie Editor</span>
          </div>
          <ul className="nav navbar-nav">
            <li className={ page === 'upload' ? 'active' : null }>
              <a href="#" onClick={ () => this.setState({ page: 'upload' }) }>Upload</a>
            </li>
            <li className={ page === 'files' ? 'active' : null }>
              <a href="#" onClick={ () => this.setState({ page: 'files' }) }>File list</a>
            </li>
          </ul>
        </nav>
        { page === 'upload' &&
          <UploadForm />
        }

        { page === 'files' &&
          <FileList onFileClick={ this.openFile } />
        }

        { page === 'video' && this.state.videoUrl
          ? <VideoCropper name={ this.state.videoName } url={ this.state.videoUrl } />
          : null
        }
      </div>
    );
  }
}
