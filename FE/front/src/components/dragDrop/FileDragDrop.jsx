import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { useUpload } from '../../context/UploadContext';
import { checkFileExtension } from '../../services/checkFileExtension';
import { BsCloudUpload, BsExclamationDiamond } from 'react-icons/bs'

const BeforeDrop = (isDragging) => {
    return (
        <div className={`dropBox w-[96%] h-[96%] border-4 border-dashed rounded-3xl ${isDragging ? 'border-[#6367EB]' : ''}`}>
            <div className='mt-5 text-2xl font-bold'>파일 업로드</div>
            <div className='mt-5 font-bold text-[#31D6D6] text-[100px] w-full flex justify-center'><BsCloudUpload/></div>
            <div className='mt- text-2xl font-bold text-[#6367EB]'>Drag & drop</div>
            <label className='DragDrop-File' htmlFor="fileUpload">
                <div className='text-lg font-bold text-[#6367EB]'>파일 선택</div>
            </label>
            <div className='mt-5 text-lg text-bold flex justify-center items-center space-x-1'><BsExclamationDiamond/><div>hwp, word, pdf, ppt only.</div></div>
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

    const [isDragging, setIsDragging] = useState(false);
    const fileId = useRef(0);
    const dragRef = useRef(null);

    const {uploadedFile, setUploadedFile, setUploadStatus, setUploadedFileType} = useUpload();

    const handleUploadBtn = () => {
        setUploadedFileType(checkFileExtension(uploadedFile))
        setUploadStatus(1)
    }

    const onChangeFiles = (e) => {
        const newFiles = e.type === "drop" ? e.dataTransfer.files : e.target.files;
        setUploadedFile((prevFile) => [
            ...prevFile,
            ...Array.from(newFiles).map((file) => ({
                id: fileId.current++,
                type: file.type,
                object: file,
            })),
        ]);
    };

    const deleteFilesById = (id) => {
        setUploadedFile(uploadedFile.filter((file) => file.id !== id));
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
        if (uploadedFile.length > 0) {
            if (checkFileExtension(uploadedFile) === false) {
                setUploadedFile([])
                alert('지원 가능한 파일만 업로드해주세요')
            }
        }
    }, [uploadedFile])

    useEffect(() => {
        if (uploadedFile.length === 0) {
            initDragEvents();
        } 
        return () => {
            resetDragEvents();
        };
    }, [uploadedFile]);

    return (
        // <div className="DragDrop flex flex-col justify-center items-center w-full h-full">
        <div className="DragDrop flex flex-col justify-center items-center m-0 w-full h-full">
            <div className="dropBox w-full h-full flex flex-col justify-center items-center border-4 bg-[#F7F6FB]" style={{borderRadius: "30px", background: "linear-gradient(100deg, rgba(255, 255, 255, 0.25) 5.69%, rgba(255, 255, 255, 0.15) 98.55%)", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)", backdropFilter: "blur(25px)"}}>
            {/* <div className={`dropBox w-[96%] h-[96%] border-4 border-dashed rounded-3xl ${isDragging ? 'border-[#6367EB]' : ''}`}> */}
            {/* <div className={`dropBox w-[96%] h-[96%] border-4 border-dashed rounded-3xl ${isDragging ? 'border-[#6367EB]' : ''}`}> */}
                <input
                    type="file"
                    id="fileUpload"
                    style={{ display: "none" }}
                    multiple={true}
                    onChange={onChangeFiles}
                />
                <label
                    className='DragDrop-File w-full h-full'
                    ref={dragRef}
                >
                    <div className={`w-full h-full flex justify-center items-center`}>
                        {/* {isDragging ? <Dragging/> : uploadedFile.length > 0 ? fileInventory(uploadedFile, deleteFilesById) : BeforeDrop()} */}
                        {uploadedFile.length > 0 ? fileInventory(uploadedFile, deleteFilesById) : BeforeDrop(isDragging)}
                    </div>
                </label>
            </div>
            {/* </div> */}
            <div className={`btns relative ${uploadedFile.length > 0 ? 'bg-blue-500' : 'bg-blue-200'} text-white w-[160px] h-[56px] mt-10 flex justify-center items-center`}>
                <button onClick={handleUploadBtn} disabled={uploadedFile.length > 0 ? false : true} className='w-full h-full'>Upload</button>
            </div>
        </div>
    )
}

export default FileDragDrop