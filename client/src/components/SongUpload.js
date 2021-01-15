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
  border: 2px solid rgb(187, 186, 186);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 16px;

  cursor: pointer;

  opacity: ${props => props.highlighted ? 0.3 : 1};

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
      > 
        <FileInput
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          onChange={handleUpload}
        />
      </Dropzone>
    </Container>
  )
}

export default SongUpload;