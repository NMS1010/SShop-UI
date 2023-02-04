import { useRef } from 'react';

const FileUploader = ({ setFileSelected, setFileSelectedError, fileSize = 2048 * 1024 }) => {
    const fileInput = useRef(null);
    const handleSelectFile = (e) => {
        const file = e.target.files[0];
        console.log(file.size);
        if (!file) setFileSelectedError('File is required');
        else {
            file.size > fileSize
                ? setFileSelectedError(`File size cannot exceed more than ${fileSize}`)
                : setFileSelected(file);
        }
    };
    return (
        <div>
            <input ref={fileInput} type={'file'} onChange={(e) => handleSelectFile(e)} />
            <button onClick={(e) => fileInput.current && fileInput.current.click()}></button>
        </div>
    );
};

export default FileUploader;
