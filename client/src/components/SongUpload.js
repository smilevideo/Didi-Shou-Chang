import styled from 'styled-components';

import { useRef, useState, useEffect } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Dropzone = styled.div`
  height: 100px;
  width: 100px;
  border: 2px solid rgb(187, 186, 186);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 16px;

  cursor: pointer;

  opacity: ${props => props.highlighted ? 0.3 : 1};

  background-image: url('/assets/cover.jpg');
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
  const [fileUrl, setFileUrl] = useState('');
  const BUCKET_PATH = "/uploads"

  const handleUpload = (event) => {
    handleFiles(event.target.files);
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
    
    handleFiles(event.dataTransfer.files);

    setDropzoneHighlighted(false);
  }

  const handleFiles = (files) => {
    const file = files[0];

    if (files[0] && file.type.substring(0, 6) === 'audio/') {
      fetchPresignedUrl(file)
        .then((presignedUrl) => {
          uploadFileToS3(file, presignedUrl);
        })
        .catch(error => console.log(error));
    }

    else {
      console.log('audio files only');
    };
  };

  const fetchPresignedUrl = async (file) => {
    const filename = file.name
      .trim()
      .replace(/\s/g,'_')
      .replace(/\{|\}|\^|\%|\`|\[|\]|\"|<|>|\~|\#|\||\@|\&/g,''); //invalid characters for s3

    const fetchUrl = `${process.env.REACT_APP_S3_PRESIGN_ENDPOINT}${parseFilename(filename)}`;

    const response = await fetch(fetchUrl);

    return response.text();
  };

  const uploadFileToS3 = async (file, presignedUrl) => {
    await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
    })
      .then ((response) => {
        console.log(response);
        setFileUrl(response.url);
      });
      // might need to wait for partial upload
      return `${process.env.REACT_APP_S3_BUCKET_BASE_URL}${BUCKET_PATH}/${file.name}`
      
  };

  const parseFilename = (fileName) => {
    const prefix = new Date().getTime()
    return `${prefix}_`
  }

  return (
    <Container>
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