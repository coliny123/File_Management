import React from 'react'
import FileList from '../components/fileList/FileList'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getAccessTokenApi } from '../api/getAccessTokenApi'

/*[{파일이름: , 파일크기: }, {파일이름: , 파일크기: }]*/

const fileInfoList = [
    {fileName: 'name1',
    fileUploadedDate: '111',
    fileSharePermission: 'true',
    fileId: '111'},
    {fileName: 'name2',
    fileUploadedDate: '222',
    fileSharePermission: 'false',
    fileId: '222'},
    {fileName: 'name3',
    fileUploadedDate: '333',
    fileSharePermission: '333',
    fileId: '333'},
    {fileName: 'name3',
    fileUploadedDate: '333',
    fileSharePermission: '333',
    fileId: '444'},
    {fileName: 'name3',
    fileUploadedDate: '333',
    fileSharePermission: '333',
    fileId: '444'},
    {fileName: 'name3',
    fileUploadedDate: '333',
    fileSharePermission: '333',
    fileId: '444'}
]

function FileManagePage(){

    useEffect(() => {
        if (localStorage.getItem('refreshToken')) {
        getAccessTokenApi();
        }
    }, [])

    const navigate = useNavigate();

    return(
        <div className='max-md:flex max-md:justify-center'>
            <div className='flex flex-col justify-center md:ml-32 max-md:w-[90%]'>
                <div className='manage-page-wrapper md:w-[720px]'>
                    <div className='text-content w-full text-left'>
                        <div>User name</div>
                        <div>File Management</div>
                    </div>
                    <div className='relative'>
                        <div className='w-[350px] md:w-[40vw]'>
                            <img src="/assets/images/file_manage_img.png" alt=""/>
                        </div>
                        <div className='bg-white relative w-[120px] h-[40px] max-md:w-[80px] max-md:h-[30px] max-md:bottom-[45px] md:bottom-[60px] flex justify-center items-center text-[#6367EB] rounded-[4px] left-[20px] hover:cursor-pointer' onClick={() => navigate('/')}>upload</div>
                    </div>
                </div>
                <div className='w-full text-left'>Dashboard</div>
                <div className='md:w-[70%]'>
                    <FileList fileInfoList={fileInfoList}></FileList>
                </div>
            </div>
        </div>
    )
}

export default FileManagePage