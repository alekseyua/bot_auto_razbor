import React, { useEffect, useState, useCallback } from 'react';
// import { useDropzone } from 'react-dropzone';

/**
 * 
 * @param {
 * 
 * children
 * setFildValue
 * initPreview
 * 
 * } param0 
 * @returns  {children({
 *       preview,
 *       onSelectFile,
 *       onSelectFiles,
 *       selectedFile,
 *       getRootProps,
 *       getInputProps,
 *       serializeFileList,
 *       isDragActive,
 *     })}
 */

const ImageUpload = ({ children, intiPreview }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [preview, setPreview] = useState();

 useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    if (!selectedFiles.length) {
      setPreview(undefined);
      return;
    }
    let imageSet = [];
    for (const key in selectedFiles) {
      const file = selectedFiles[key];
      if (file instanceof File) {
        const objectUrl = URL.createObjectURL(file);
        imageSet.push(objectUrl);
      }
    }
    setPreview(imageSet);
    return () => {
      imageSet.forEach((el) => {
        URL.revokeObjectURL(el);
      });
    };
  }, [selectedFiles]);

  useEffect(() => {
    setPreview(intiPreview);
  }, []);

  const onSelectFile = (file) => {
    if (!file) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(file);
  };

  const onSelectFiles = (files) => {
    if (!files) {
      setSelectedFiles([]);
      return;
    }
    setSelectedFiles(files);
  };

  const serializeFileList = (files) => {
    let imageSet = [];
    for (const key in files) {
      const file = files[key];
      if (file instanceof File) {
        const objectUrl = URL.createObjectURL(file);
        imageSet.push(objectUrl);
      }
    }
    return imageSet;
  };
  

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    const file = acceptedFiles[0];
    setSelectedFile(file);
  }, []);

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      {children({
        preview,
        onSelectFile,
        onSelectFiles,
        selectedFile,
        // getRootProps,
        // getInputProps,
        serializeFileList,
        // isDragActive,
      })}
    </>
  );
};

export default React.memo(ImageUpload);
