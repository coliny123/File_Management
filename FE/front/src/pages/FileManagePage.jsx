import React from 'react'
import FileList from '../components/fileList/FileList'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAccessTokenApi } from '../api/getAccessTokenApi'
import { useUserDataQuery } from '../hooks/query/useUserDataQuery'
import axios from 'axios'
import { useIsLogin } from '../context/IsLoginContext'

const NotLoginFileInfo = () => {

    const navigate = useNavigate();

    return(
        <div className='bg-white mt-4 h-[40vh] max-md:h-[25vh] md:w-[70%] flex flex-col justify-center items-center rounded-[16px] md:mb-10'>
            <div className='font-bold text-lg'>로그인 후 확인 가능합니다.</div>
            <div onClick={() => navigate('/login')} className='bg-[#F7F6FB] text-[#6367EB] w-[120px] h-[40px] flex justify-center items-center text-lg font-bold mt-[16px]'>로그인</div>
        </div>
    )
}

function FileManagePage(){
    const [accessToken, setAccessToken] = useState(false);
    const { isPending, error, data, refetch } = useUserDataQuery({
        enabled: accessToken,
    });
    const [fileInfoList, setFileInfoList] = useState(null);
    const { isLogin } = useIsLogin();

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
    
    return(
        <div className='max-md:flex max-md:justify-center'>
            <div className='flex flex-col justify-center md:ml-32 max-md:w-[90%]'>
                <div className='manage-page-wrapper md:w-[720px]'>
                    <div className='text-content w-full text-left'>
                        <div>{data?.userName}</div>
                        <div className='text-2xl font-bold ml-3 mb-4'>File Management</div>
                    </div>
                    <div className='relative'>
                        <div className='w-[350px] lg:w-[40vw]'>
                            <img src="/assets/images/file_manage_img.png" alt=""/>
                        </div>
                        <div className='bg-white relative w-[120px] h-[40px] max-lg:w-[80px] max-lg:h-[30px] max-lg:bottom-[45px] lg:bottom-[60px] flex justify-center items-center text-[#6367EB] rounded-[4px] left-[20px] hover:cursor-pointer' onClick={() => navigate('/')}>upload</div>
                    </div>
                </div>
                <div className='w-full text-left text-xl font-bold'>Dashboard</div>
                <div className='flex justify-around md:w-[70%] border-b-4 border-b-[#999999] text-[#999999] mt-3'>
                    <div className='w-[20%] ml-5'>파일명</div>
                    <div className='w-[20%]'>확장자</div>
                    <div className='w-[20%]'>파일크기</div>
                    <div className='w-[20%]'>업로드일</div>
                    <div className='w-[20%]'>공유허용</div>
                </div>
                {!isLogin && <NotLoginFileInfo/>}
                {fileInfoList && (
                <div className='md:w-[70%] mb-4'>
                    <FileList fileInfoList={fileInfoList}></FileList>
                </div>
                )}
            </div>
        </div>
    )
}

export default FileManagePage