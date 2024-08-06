// More uptimized version of the authentication layer

import { SignOut } from "@/lib/auth-methods";
import { addInfo, addUser } from "@/store/slices/userSlice";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from 'reselect';

const selectAccessToken = createSelector(
  state => state.User.data,
  user => user.access_token
);

export default function AuthLayer({ children }) {
  const { data } = useSession();
  const access_token = useSelector(selectAccessToken);
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchAccessToken = useCallback(async () => {
    try {
      const response = await axios.get('/api/getcookie');
      if (response.data && response.data.UserAuth) {
        const { access_token } = response.data.UserAuth;
        dispatch(addUser(response.data.UserAuth));
        if (!localStorage.getItem('info')) {
          const userInfo = await axios.get(`${process.env.API_URL}/api/v1/u/getuser`, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });
          dispatch(addInfo(userInfo.data.result));
        }
      } else {
        dispatch(addUser({}));
      }
    } catch (error) {
      console.error('Error fetching access token:', error);
      dispatch(addUser({}));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!access_token && data?.user) {
      const googleAuth = async () => {
        try {
          await axios.post(`${process.env.API_URL}/api/v1/u/auth/google-auth`, {
            email: data.user.email,
            fullname: data.user.name,
            image: data.user.image
          }, { withCredentials: true });
        } catch (error) {
          toast.error("Error in Oauth");
        }
      };
      googleAuth();
    }
  }, [access_token, data]);

  useEffect(() => {
    if (data?.user) {
      fetchAccessToken();
    }
  }, [data, fetchAccessToken]);

  return <>{children}</>;
}























// import { SignOut } from "@/lib/auth-methods";
// import { addInfo, addUser } from "@/store/slices/userSlice";
// import axios from "axios";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";


// export default function AuthLayer({ children }) {

//   const { data} = useSession();
//   const {access_token} = useSelector((state) => state.User.data);
//   const router = useRouter();


//   const dispatch = useDispatch();




//   useEffect(() => {
//     if(!access_token){
//       const googleAuth = async () => {
//         try {
//           const response = await axios.post(`${process.env.API_URL}/api/v1/u/auth/google-auth`, {
//             email : data.user.email,
//             fullname : data.user.name,
//             image : data.user.image
//           },  { withCredentials: true });

//         } catch (error) {
//           toast.error("Error in Oauth");
//         }
//       }
  
//       setTimeout(async () => {
//         if(data?.user){
//           googleAuth();
//           // router.reload();
//         }
//       }, 1000);
//     }

//   },[data])

//   useEffect(() => {
//     const fetchAccessToken = async () => {
//       try {
//         const response = await axios.get('/api/getcookie');

//         if (response && response.data && response.data.UserAuth) {
//           const responseData = response.data.UserAuth;

//           // fetching the all information about the user


//           if(responseData){
//             dispatch(addUser(responseData));
//             if(!localStorage.getItem('info')){
//               setTimeout(async () => {
//                 try {
//                   const info = await axios.get(process.env.API_URL + '/api/v1/u/getuser', {
//                     headers: {
//                       Authorization: `Bearer ${responseData.access_token}`,
//                     },
//                   });
    

//                   dispatch(addInfo(info.data.result))
    
//                   // Or handle the response as needed
//                 } catch (error) {
//                   console.error('Error fetching user data:', error);
//                 }
//               }, 1000);
//             }

//           }
//         } else {
//           dispatch(addUser({})); // Or handle the absence of UserAuth as needed
//         }
//       } catch (error) {
//         console.error('Error fetching access token:', error);
//         dispatch(addUser({})); // Handle the error case
//       }
//     };

//     fetchAccessToken();
//   }, []);

//   return (
//     <>
//       {children}
//     </>
//   )
// }