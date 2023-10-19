import React from 'react'
import FileDragDrop from '../components/dragDrop/FileDragDrop'
import FileStatusbar from '../components/bar/FileStatusbar'
import QrCode from '../components/qrCode/QrCode'
import useUser from '../hooks/query/useUserDataQuery'
import Progressbar from '../components/bar/Progressbar'
import { loginApi } from '../api/loginApi'
import { useQuery, QueryClient } from '@tanstack/react-query'
import { useUpload } from '../context/UploadContext'
import Convert from '../components/convert/Convert'

function LandingPage() {

  // const queryClient = new QueryClient();

  // const { isPending, error, data } = useQuery({
  //   queryKey: ['userData'],
  //   queryFn: () =>loginApi(),
  // })

  // console.log(data);

  const {uploadStatus} = useUpload();
  return (
    <div>
        <div className='content-wrapper w-full h-full flex flex-col justify-center items-center '>
          {/* <div className='mt-[40px] w-[490px]'> */}
          <div className='mt-[40px] md:w-[490px] w-[60vw]'>
            <FileStatusbar></FileStatusbar>
          </div>
          {/* <div className='w-[640px] h-[400px]'> */}
        <div className='md:w-[640px] w-[60vw] h-[400px]'>
          { uploadStatus === 0 ? <FileDragDrop/> : uploadStatus === 1 ? <Convert/> : uploadStatus === 2 ? <Progressbar/> : <QrCode/>}
          </div>
        </div>
    </div>
  )
}

export default LandingPage
