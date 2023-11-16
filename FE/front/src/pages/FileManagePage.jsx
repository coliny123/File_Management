import React from 'react'
import FileList from '../components/fileList/FileList'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAccessTokenApi } from '../api/getAccessTokenApi'
import { useUserDataQuery } from '../hooks/query/useUserDataQuery'
import axios from 'axios'

function FileManagePage(){
    const [accessToken, setAccessToken] = useState(false);
    const { isPending, error, data, refetch } = useUserDataQuery({
        enabled: accessToken,
    });
    const [fileInfoList, setFileInfoList] = useState(null);

    const navigate = useNavigate();

    const refetchData = async () => {
        await refetch();
    }

    useEffect(() => {
        const fetchData = async () => {
            if (axios.defaults.headers.common['Authorization']) {
                setAccessToken(true);
                return;
            }
            if (localStorage.getItem('refreshToken')) {
                await getAccessTokenApi();
                setAccessToken(true);
            }
        };

        fetchData();
    }, [isPending]);

    useEffect(() => {
        if (data) {
            refetchData();
            setFileInfoList(data.files);
        }
    }, [data]);
    


    console.log(fileInfoList);

    return(
        <div className='max-md:flex max-md:justify-center'>
            <div className='flex flex-col justify-center md:ml-32 max-md:w-[90%]'>
                <div className='manage-page-wrapper md:w-[720px]'>
                    <div className='text-content w-full text-left'>
                        <div>{data?.userName}</div>
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
                {/* <div className='md:w-[70%]'>
                    <FileList fileInfoList={fileInfoList}></FileList>
                </div> */}
                {fileInfoList && (
                <div className='md:w-[70%]'>
                    <FileList fileInfoList={fileInfoList}></FileList>
                </div>
                )}
            </div>
        </div>
    )
}

export default FileManagePage