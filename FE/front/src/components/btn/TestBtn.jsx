import React from 'react'
import fetchUserDataApi from '../../api/fetchUserDataApi'

function TestBtn({accessToken}) {
    console.log(accessToken);
  return (
    <div className='bg-yellow-500'>
      <button className='bg-yellow-500' onClick={() => fetchUserDataApi()}>테스트 버튼</button>
    </div>
  )
}

export default TestBtn
