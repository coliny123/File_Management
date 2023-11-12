// import { useQuery } from '@tanstack/react-query';
// import fetchUserDataApi from '../../api/fetchUserDataApi';
// import { getAccessTokenApi } from '../../api/getAccessTokenApi';
// import { Query } from 'react-query';

// export function useUserDataQuery() {
//     return useQuery(['userData'], () => fetchUserDataApi(), {
//         retry: (failureCount, error) => {
//             if (error.response && error.response.status === 401) {
//                 return false; // 401 에러인 경우 재시도
//             }
//             return true; // 그 외의 경우 재시도하지 않음
//         },
//         onError: async (error, variables, context) => {
//             if (error.response && error.response.status === 401) {
//                 await getAccessTokenApi(); // 토큰 새로 발급받기
//                 query.refetch();
//             }
//         },
//     });
// }

import { useQuery } from '@tanstack/react-query';
import fetchUserDataApi from '../../api/fetchUserDataApi';
import { getAccessTokenApi } from '../../api/getAccessTokenApi';

export function useUserDataQuery(options) {
  const query = useQuery(['userData'], () => fetchUserDataApi(), {
    ...options,
    retry: (failureCount, error) => {
      console.log(error);
      if (error.response.status === 401 || error.response.status === 500) {
        return false; // 401 에러인 경우 재시도하지 않음
      }
      return true; // 그 외의 경우 재시도
    },
    onError: async (error, variables, context) => {
    console.log(error)
      if (error.response.status === 401 || error.response.status === 500) {
        console.log('쿼리에서 토큰 받기')
        await getAccessTokenApi(); // 토큰 새로 발급받기
        query.refetch(); // 쿼리 다시 실행
      }
    },
  });

  return query;
}
