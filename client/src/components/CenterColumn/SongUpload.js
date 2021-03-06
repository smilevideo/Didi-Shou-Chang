
import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import { parseBlob } from 'music-metadata-browser';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const FileInput = styled.input`
  display: none;
`

const Dropzone = styled.div`
  height: 170px;
  width: 170px;
  border: 1px solid rgb(187, 186, 186);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 16px;

  cursor: ${props => props.canUpload ? 'pointer' : null};

  opacity: ${props => props.highlighted ? 0.3 : 1};

  background-image: ${props => props.canUpload ? "url('assets/a.gif')" : "url('/assets/woo2.gif')"};
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  background-repeat: no-repeat;
`

const ProgressMessage = styled.div`
  height: 30px;

  display: grid;
  justify-content: center;
  align-items: center;
`

const SongUpload = (props) => {
  const { sendMessage } = props;

  const [dropzoneHighlighted, setDropzoneHighlighted] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');

  const fileInputRef = useRef(null);

  const canUpload = !progressMessage;

  const handleClick = (event) => {
    event.target.value = '';
  };

  const handleUpload = (event) => {
    handleFiles(event.target.files);
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const onDragOver = (event) => {
    event.preventDefault();

    setDropzoneHighlighted(true);
  };

  const onDragLeave = () => {
    setDropzoneHighlighted(false);
  };

  const onDrop = (event) => {
    event.preventDefault();
    
    handleFiles(event.dataTransfer.files);

    setDropzoneHighlighted(false);
  };

  const handleFiles = async (files) => {
    const file = files[0];

    if (progressMessage) {
      console.log('upload already in progress');
    }

    else if (file && file.type.substring(0, 6) === 'audio/') {
      const filename = parseFilename(file.name);
      const audioUrl = `${process.env.REACT_APP_S3_BUCKET_BASE_URL}/uploads/${filename}`;
      
      setProgressMessage('fetching presigned URL');
      const presignedUrl = await fetchPresignedUrl(filename);

      setProgressMessage('uploading song to S3');
      await uploadFileToS3(file, presignedUrl);

      setProgressMessage('parsing song metadata');
      const metadata = await getMetadata(file);

      const duration = metadata.format.duration;
      const artist = metadata.common.artist;
      const title = metadata.common.title;

      let label;

      if (artist && title) {
        label = `${artist} - ${title}`;
      } else {
        label = file.name;
      };

      const message = {
        type: 'addSong',
        url: audioUrl,
        label,
        duration, 
      };
      sendMessage(message);

      setProgressMessage('');
    }

    else {
      console.log('audio files only');
    };
  };

  const parseFilename = (fileName) => {
    const name = fileName.trim()
      .replace(/\s/g,'_')
      .replace(/\{|\}|\^|\%|\`|\[|\]|\"|<|>|\~|\#|\||\@|\&/g,''); //invalid characters for s3
    const prefix = new Date().getTime()
    return `${prefix}_${name}`
  };

  const fetchPresignedUrl = async (filename) => {
    const fetchUrl = `${process.env.REACT_APP_S3_PRESIGN_ENDPOINT}${filename}`;

    const response = await fetch(fetchUrl);

    return response.text();
  };

  const uploadFileToS3 = (file, presignedUrl) => {
    return fetch(presignedUrl, {
      method: 'PUT',
      body: file,
    });
  };

  const getMetadata = (file) => {
    return parseBlob(file);
  };

  return (
    <Container>
      <Dropzone 
        onClick={canUpload ? openFileDialog: null}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={canUpload ? onDrop : null}
        highlighted={dropzoneHighlighted}
        canUpload={canUpload}
      />

      <FileInput
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onClick={handleClick}
        onChange={handleUpload}
      />

      <ProgressMessage>
        {progressMessage}
      </ProgressMessage>
    </Container>
  )
};

export default SongUpload;