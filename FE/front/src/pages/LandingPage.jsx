import React, { useEffect } from 'react'
import FileDragDrop from '../components/dragDrop/FileDragDrop'
import FileStatusbar from '../components/bar/FileStatusbar'
import QrCode from '../components/qrCode/QrCode'
import useUser from '../hooks/query/useUserDataQuery'
import Progressbar from '../components/bar/Progressbar'
import { useQuery, QueryClient } from '@tanstack/react-query'
import { useUpload } from '../context/UploadContext'
import Convert from '../components/convert/Convert'
import { useAccessToken } from '../context/AccessTokenContext'
import TestBtn from '../components/btn/TestBtn'
import { getAccessTokenApi } from '../api/getAccessTokenApi'

function LandingPage() {

  // const queryClient = new QueryClient();

  // const { isPending, error, data } = useQuery({
  //   queryKey: ['userData'],
  //   queryFn: () =>loginApi(),
  // })

  // console.log(data);

  // const { accessToken } = useAccessToken();
  // console.log(accessToken)

  useEffect(() => {
    if (localStorage.getItem('refreshToken')) {
      getAccessTokenApi();
    }
  }, [])

  const {uploadStatus} = useUpload();
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
          </div>
        </div>
        </div>
    </div>
  )
}

export default LandingPage
