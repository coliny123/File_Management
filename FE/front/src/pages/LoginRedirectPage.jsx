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

const Server_IP = process.env.REACT_APP_Server_IP;

function LoginRedirectPage() {
    const [loginSuccess, setLoginSuccess] = useState(false);
    const { provider } = useParams();

    const code = new URLSearchParams(window.location.search).get('code');

    // const queryClient = useQueryClient()
    // const { isPending, error, data } = useUserDataQuery(provider, code);

    useEffect(() => {
      loginApi(provider, code);
      // getUserData 처리
    })


    // useEffect(() => {
    //     if (data) {
    //         setLoginSuccess(true);
    //         console.log(data);
    //     }
    // }, [data]);

    return (
        <div>
            {/* {isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p>Error occurred while fetching data</p>
            ) : loginSuccess ? (
                <p>Login successful</p>
            ) : (
                <p>Login failed</p>
            )} */}
        </div>
    );
}

export default LoginRedirectPage;

