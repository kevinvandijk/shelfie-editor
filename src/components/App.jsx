import React from 'react';
import UploadForm from './UploadForm';
import FileList from './FileList';

export default class App extends React.Component {
  async openFile(file) {
    const response = await fetch(`http://127.0.0.1:3000/video?file=${encodeURIComponent(file)}`);
    console.log(response);
  }

  render() {
    return (
      <div>
        <UploadForm />
        <FileList onFileClick={ this.openFile } />
      </div>
    );
  }
}
