import styled from 'styled-components';

import { useRef, useState, useEffect } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Upload = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
  text-align: left;
  overflow: hidden;
`

const Content = styled.span`
  display: flex;
  flex-direction: row;
  padding-top: 16px;
  box-sizing: border-box;
  width: 100%;
`

const Files = styled.div`
  margin-left: 32px;
  align-items: flex-start;
  justify-items: flex-start;
  flex: 1;
  overflow-y: auto;
`

const Actions = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  align-items: flex-end;
  flex-direction: column;
  margin-top: 32px;
`

const Title = styled.div`
  margin-bottom: 32px;
  color: #555;
`

const Dropzone = styled.div`
  height: 200px;
  width: 200px;
  background-color: #fff;
  border: 2px solid rgb(187, 186, 186);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 16px;

  cursor: pointer;

  background-color: ${props => props.highlighted ? "rgb(188, 185, 236)" : "#fff"};

  background-image: url('/assets/c.gif');
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  background-repeat: no-repeat;
`

const FileInput = styled.input`
  display: none;
`

const SongUpload = () => {
  const fileInputRef = useRef(null);

  const [dropzoneHighlighted, setDropzoneHighlighted] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [successfullyUploaded, setSuccessfulyUploaded] = useState(false);

  const onFilesAdded = (newFiles) => {
    setFiles(...files, newFiles);
  }

  const handleUpload = (event) => {
    console.log(event.target.files);
  }

  const openFileDialog = () => {
    fileInputRef.current.click();
  }

  const onDragOver = (event) => {
    event.preventDefault();

    setDropzoneHighlighted(true);
  }

  const onDragLeave = () => {
    setDropzoneHighlighted(false);
  }

  const onDrop = (event) => {
    event.preventDefault();
    
    console.log(event.dataTransfer.files);
    handleUpload(event);

    setDropzoneHighlighted(false);
  }

  return (
    <Container>
      {/* <Upload>
        <Title>Upload Files</Title>
        <Content>
          <div />
          <Files />
        </Content>
        <Actions />
      </Upload> */}

      <Dropzone 
        onClick={openFileDialog}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        highlighted={dropzoneHighlighted}
        onFilesAdded={onFilesAdded}
      >
        {/* <img src="/assets/a.gif" alt="upload songs here" /> */}
        <div></div>
        
        <FileInput
          ref={fileInputRef}
          type="file"
          onChange={handleUpload}
        />
      </Dropzone>
    </Container>
  )
}

export default SongUpload;