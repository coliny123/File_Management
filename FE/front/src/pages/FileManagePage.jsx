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
        <div>
            <div>파일 관리 페이지</div>
            <FileList fileInfoList={fileInfoList}></FileList>
        </div>
    )
}

export default FileManagePage