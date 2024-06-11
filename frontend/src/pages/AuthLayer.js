
import { addUser } from "@/store/slices/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function AuthLayer({children}){

    
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/getcookie');

        if (response && response.data && response.data.UserAuth) {
          const responseData = response.data.UserAuth;
          dispatch(addUser(responseData));
        } else {
          dispatch(addUser({})); // Or handle the absence of UserAuth as needed
        }
      } catch (error) {
        console.error('Error fetching access token:', error);
        dispatch(addUser({})); // Handle the error case
      }
    };

    fetchAccessToken();
  }, [dispatch]);

// console.log("Auth Layer")
    return(
        <>
            {children}
        </>
    )
}