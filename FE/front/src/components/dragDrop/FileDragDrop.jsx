import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { useUpload } from '../../context/UploadContext';
import { checkFileExtension } from '../../services/checkFileExtension';
import { BsCloudUpload, BsExclamationDiamond } from 'react-icons/bs'
import { AiFillCheckCircle } from 'react-icons/ai'
import { useIsLogin } from '../../context/IsLoginContext';
import { useNavigate } from 'react-router-dom';
import { RiFileHwpLine } from "react-icons/ri";
import { FaRegFilePdf } from "react-icons/fa";
import { BsFiletypePpt } from "react-icons/bs";
import { FaRegFileWord } from "react-icons/fa";

const BeforeDrop = (isDragging) => {
    return (
        <div className={`dropBox w-[96%] h-[96%] border-4 border-dashed rounded-3xl ${isDragging ? 'border-[#6367EB]' : ''}`}>
            <div className='mt-5 text-2xl font-bold'>파일 업로드</div>
            <label className='DragDrop-File' htmlFor="fileUpload">
                <div className='mt-5 font-bold text-[#31D6D6] text-[100px] w-full flex justify-center'><BsCloudUpload/></div>
            </label>
            <div className='text-2xl font-bold text-[#6367EB] max-md:hidden'>Drag & drop</div>
            <label className='DragDrop-File' htmlFor="fileUpload">
                <div className='text-lg font-bold text-[#6367EB]'>파일 선택</div>
            </label>
            <div id='notice' className='mt-5 text-lg text-bold flex justify-center items-center space-x-1'><BsExclamationDiamond/><div>hwp, word, pdf, ppt only.</div></div>
        </div>
    )
}

const LoginNotice = () => {

    const navigate = useNavigate();

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='text-xl font-bold'>로그인 후 이용 가능</div>
            <div onClick={() => navigate('/login')} className='hover:cursor-pointer bg-[#6367EB] text-white w-[120px] h-[48px] flex justify-center items-center text-lg mt-[16px] rounded-[18px]'>로그인</div>
        </div>
    )
}

const FileInventory = (files, deleteFilesById) => {
    const { id, object: { name, size }, type } = files[0];
    const transferedSize = size / 1048576 > 0.1 ? `${(size / 1048576).toFixed(2)}Mb` : `${(size / 1024).toFixed(2)}Kb`;
    const transferredFileFormat = checkFileExtension(files);
    return (
        <div className="DragDrop-Files flex flex-col justify-center items-center">
            {transferredFileFormat === 'hwp' && <div className='text-[100px] text-center'><RiFileHwpLine /></div>}
            {transferredFileFormat === 'pdf' && <div className='text-[100px] text-center'><FaRegFilePdf /></div>}
            {transferredFileFormat === 'ppt' && <div className='text-[100px] text-center'><BsFiletypePpt /></div>}
            {transferredFileFormat === 'word' && <div className='text-[100px] text-center'><FaRegFileWord /></div>}
            <div className='fileInfo-area flex flex-col justify-center items-center'>
                <div className='flex space-x-1 items-center justify-center text-lg font-bold'><div className='text-[#107C10] text-2xl'><AiFillCheckCircle/></div><div>{name}</div></div>
                <div className="DragDrop-Files-Filter w-[20px] h-[20px] rounded-full bg-[#DBDADE] hover:cursor-pointer flex justify-center items-center" onClick={() => deleteFilesById(id)}>X</div>
                <div>{transferedSize}</div>
                {/* <div className='mt-2 text-lg text-bold flex justify-center items-center space-x-1'><BsExclamationDiamond/><div>hwp, word, pdf, ppt only.</div></div> */}
                <div className='mt-2 text-lg text-bold flex justify-center items-center space-x-1'><BsExclamationDiamond/><div>hwp, word, pdf, ppt only</div></div>
            </div>
        </div>
    )
}

function FileDragDrop() {

    const [isDragging, setIsDragging] = useState(false);
    const fileId = useRef(0);
    const dragRef = useRef(null);
    const { isLogin } = useIsLogin();

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
            if (uploadedFile[0].object.size >= 500 * 1024 * 1024) {
                setUploadedFile([])
                alert('500MB 미만의 파일만 업로드 가능합니다.')
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
        <div className="DragDrop flex flex-col justify-center items-center m-0 w-full h-full">
            <div className="dropBox w-full h-full flex flex-col justify-center items-center border-4 bg-[#F7F6FB]" style={{borderRadius: "30px", background: "linear-gradient(100deg, rgba(255, 255, 255, 0.25) 5.69%, rgba(255, 255, 255, 0.15) 98.55%)", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)", backdropFilter: "blur(25px)"}}>
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
                        {!isLogin ? <LoginNotice/> : uploadedFile.length > 0 ? FileInventory(uploadedFile, deleteFilesById) : BeforeDrop(isDragging)}
                        {/* {uploadedFile.length > 0 ? FileInventory(uploadedFile, deleteFilesById) : BeforeDrop(isDragging)} */}
                    </div>
                </label>
            </div>
            <div className={`btns relative ${uploadedFile.length > 0 ? 'bg-blue-500' : 'bg-blue-200'} text-white w-[160px] h-[56px] mt-10 flex justify-center items-center`}>
                <button onClick={handleUploadBtn} disabled={uploadedFile.length > 0 ? false : true} className='w-full h-full'>Upload</button>
            </div>
        </div>
    )
}

export default FileDragDrop
