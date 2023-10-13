// import React from 'react';
// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { loginApi } from '../api/loginApi';
// import { useQuery } from '@tanstack/react-query';

// const Server_IP = process.env.REACT_APP_Server_IP;

// function LoginRedirectPage() {

//     const [loginSuccess, setLoginSuccess] = useState(false);
//     const { provider } = useParams();

//   const urlParams = new URLSearchParams(window.location.search);
//   const code = urlParams.get('code');

//   const { isPending, error, data } = useQuery({
//     queryKey: ['userData'],
//     queryFn: () =>
//       loginApi(provider, code),
//   })

//   console.log(data);

//     console.log(provider)

//     useEffect(() => {
//         const urlParams = new URLSearchParams(window.location.search);
//         const code = urlParams.get('code');

//         const userData = loginApi(provider, code);
        
//     }, []);

//     return (
//     <div>
      
//     </div>
//   )
// }

// export default LoginRedirectPage



import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { loginApi } from '../api/loginApi';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useUserDataQuery } from '../hooks/query/useUserDataQuery';
import { useIsLogin } from '../context/IsLoginContext';

const Server_IP = process.env.REACT_APP_Server_IP;

function LoginRedirectPage() {
    const [loginSuccess, setLoginSuccess] = useState(false);
    const { provider } = useParams();

    const code = new URLSearchParams(window.location.search).get('code');
    const [isLogin, setIsLogin] = useIsLogin();

    // const queryClient = useQueryClient()
    // const { isPending, error, data } = useUserDataQuery(provider, code);

    useEffect(async () => {
      await loginApi(provider, code);
      setIsLogin(true);
      window.location.href = 'http://localhost:3000/'
    })

    return (
        <div>
            로그인 중
        </div>
    );
}

export default LoginRedirectPage;

