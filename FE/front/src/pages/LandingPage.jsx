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
          <div className='mt-[84px] md:w-[397px] w-[60vw]'>
            <FileStatusbar></FileStatusbar>
          </div>
          {/* <div className='w-[640px] h-[400px]'> */}
        {/* <div className='md:w-[480px] w-[60vw] h-[320px] mt-[60px]' style={{border-radius: 30px; background: linear-gradient(100deg, rgba(255, 255, 255, 0.25) 5.69%, rgba(255, 255, 255, 0.15) 98.55%); box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); backdrop-filter: blur(25px)}}>
          { uploadStatus === 0 ? <FileDragDrop/> : uploadStatus === 1 ? <Convert/> : uploadStatus === 2 ? <Progressbar/> : <QrCode/>}
          </div>
        </div> */}
        {/* <div className="md:w-[480px] w-[60vw] h-[320px] mt-[60px]" style={{borderRadius: "30px", background: "linear-gradient(100deg, rgba(255, 255, 255, 0.25) 5.69%, rgba(255, 255, 255, 0.15) 98.55%)", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)", backdropFilter: "blur(25px)"}}> */}
        <div className="w-[480px] h-[400px] mt-[60px]">
          <div className='w-full h-full m-0'>
          { uploadStatus === 0 ? <FileDragDrop/> : uploadStatus === 1 ? <Convert/> : uploadStatus === 2 ? <Progressbar/> : <QrCode/>}
          </div>
        </div>
        </div>
    </div>
  )
}

export default LandingPage
