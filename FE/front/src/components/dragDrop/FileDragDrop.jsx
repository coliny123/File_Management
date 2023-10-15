import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { sendFiles } from '../../services/sendFiles';
import { useUploadProgress } from '../../context/UploadProgressContext';


const BeforeDrop = () => {
    return (
        <div>
            <div className='mt-20 text-2xl font-bold'>파일 업로드</div>
            <div className='mt-20 text-lg'>drag and drop</div>
            <div>or</div>
            <label
                className='DragDrop-File'
                htmlFor="fileUpload"
            >파일 올리기 버튼</label>
        </div>
    )
}

const fileInventory = (files, deleteFilesById) => {
    return (
        <div className="DragDrop-Files">
            {files.length > 0 &&
                files.map((file) => {
                    const { id, object: { name }, type } = file;
                    return (
                        <div key={id}>
                            <span>{name} {type}  </span>
                            <span
                                className="DragDrop-Files-Filter"
                                onClick={() => deleteFilesById(id)}
                            >
                                X
                            </span>
                        </div>
                    );
                })}
        </div>
    )
}

function FileDragDrop() {

    const { setUploadProgress } = useUploadProgress();

    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState([]);
    const fileId = useRef(0);
    const dragRef = useRef(null);

    const onChangeFiles = (e) => {
        const newFiles = e.type === "drop" ? e.dataTransfer.files : e.target.files;
        setFiles((prevFiles) => [
            ...prevFiles,
            ...Array.from(newFiles).map((file) => ({
                id: fileId.current++,
                type: file.type,
                object: file,
            })),
        ]);
    };

    const deleteFilesById = (id) => {
        setFiles(files.filter((file) => file.id !== id));
    };

    const handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDragging(true);
    };

    const handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer.files) {
            setIsDragging(true);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        onChangeFiles(e);
        setIsDragging(false);
    };

    const initDragEvents = () => {
        if (dragRef.current !== null) {
            dragRef.current.addEventListener("dragenter", handleDragIn);
            dragRef.current.addEventListener("dragleave", handleDragOut);
            dragRef.current.addEventListener("dragover", handleDragOver);
            dragRef.current.addEventListener("drop", handleDrop);
        }
    };

    const resetDragEvents = () => {
        if (dragRef.current !== null) {
            dragRef.current.removeEventListener("dragenter", handleDragIn);
            dragRef.current.removeEventListener("dragleave", handleDragOut);
            dragRef.current.removeEventListener("dragover", handleDragOver);
            dragRef.current.removeEventListener("drop", handleDrop);
        }
    };

    useEffect(() => {
        initDragEvents();
        return () => resetDragEvents();
    }, []);

    return (
        <div className="DragDrop flex flex-col justify-center items-center w-full h-full">
            <div className='dropBox w-full h-full border-4 border-dashed rounded-3xl'>
                <input
                    type="file"
                    id="fileUpload"
                    style={{ display: "none" }}
                    multiple={true}
                    onChange={onChangeFiles}
                />
                <label
                    className='DragDrop-File w-40 h-40'
                    ref={dragRef}
                >
                    <div className={`w-full h-full flex justify-center ${isDragging ? "bg-sky-500" : ""}`}>
                        {isDragging ? '파일을 놓아주세요' : files.length > 0 ? fileInventory(files, deleteFilesById) : BeforeDrop()}
                    </div>
                </label>
            </div>
            <div className='btns bg-blue-500 text-white w-[160px] mt-10'>
                <button onClick={() => sendFiles(files, setUploadProgress)}>Upload</button>
            </div>
        </div>
    )
}

export default FileDragDrop
