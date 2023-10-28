import React from 'react'
import FileList from '../components/fileList/FileList'

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
    fileId: '444'}
]

function FileManagePage(){
    return(
        <div className='flex flex-col justify-center ml-32'>
            <div className='manage-page-wrapper w-[720px]'>
                <div className='text-content w-full text-left'>
                    <div>User name</div>
                    <div>File Management</div>
                </div>
                <div className='button-content w-[560px] h-[160px] bg-purple-400'>
                    버튼
                </div>
            </div>
            <div className='w-full text-left'>Dashboard</div>
            <div className='w-[656px]'>
                <FileList fileInfoList={fileInfoList}></FileList>
            </div>
        </div>
    )
}

export default FileManagePage