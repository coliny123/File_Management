import React, { useEffect, useState } from 'react'
import FileDragDrop from '../components/dragDrop/FileDragDrop'
import FileStatusbar from '../components/bar/FileStatusbar'
import QrCode from '../components/qrCode/QrCode'
import useUser, { useUserDataQuery } from '../hooks/query/useUserDataQuery'
import Progressbar from '../components/bar/Progressbar'
import { useQuery, QueryClient } from '@tanstack/react-query'
import { useUpload } from '../context/UploadContext'
import Convert from '../components/convert/Convert'
import { useAccessToken } from '../context/AccessTokenContext'
import TestBtn from '../components/btn/TestBtn'
import { getAccessTokenApi } from '../api/getAccessTokenApi'

function LandingPage() {

  // console.log(data);

  // const { accessToken } = useAccessToken();
  // console.log(accessToken)
  
  const [accessToken, setAccessToken] = useState(false);

  const { isPending, error, data} = useUserDataQuery({
    enabled: accessToken,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem('refreshToken')) {
        console.log('토큰 받아오는 중')
        await getAccessTokenApi();
        console.log('토큰 받아왔음')
        setAccessToken(true);
      }
      };
      fetchData();
  }, []);


  const {uploadStatus} = useUpload();
  console.log(data);
  return (
    <div>
        <div className='content-wrapper w-full h-full flex flex-col justify-center items-center '>
          {/* <TestBtn></TestBtn>
          <div><button onClick={getAccessTokenApi}>리프레쉬로 액세스 발급</button></div> */}
          <div className='md:mt-[60px] md:w-[397px] w-[60vw] max-md:invisible'>
            <FileStatusbar></FileStatusbar>
          </div>
        <div className="w-[80%] md:w-[480px] h-[400px] md:mt-[50px]">
          <div className='w-full h-full m-0'>
          { uploadStatus === 0 ? <FileDragDrop/> : uploadStatus === 1 ? <Convert/> : uploadStatus === 2 ? <Progressbar/> : <QrCode/>}
          {/* { uploadStatus === 0 ? <FileDragDrop/> : uploadStatus === 1 ? <Progressbar/> : <QrCode/>} */}
          </div>
        </div>
        </div>
    </div>
  )
}

export default LandingPage
