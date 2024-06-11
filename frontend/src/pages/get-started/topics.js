import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import CheckboxButton from "./checkbox";
import AuthLayer from "../AuthLayer";
import axios from "axios";
import { disable } from "@/store/slices/authSlice";
import toast from "react-hot-toast";

export default function Topics() {

    const [error, setError] = useState(null);
  

    const router = useRouter();
    const userData = useSelector((state) => state.User.data);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);


    const [topics, setTopics] = useState([...new Set([
        "Amount", "Interest", "Time", "Period", "web development",
        "web design", "react developer"
    ])]);
    const [selectedTopics, setSelectedTopics] = useState([]);

    // Fetch selected topics data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.API_URL}/api/v1/u/topics`, {
                    headers: {
                        Authorization: `Bearer ${userData?.access_token}`
                    }
                });
                
                if (response.data) {
                    setSelectedTopics(response.data.result.interested_in);
                }
            } catch ({error}) {
                console.error("Error fetching selected topics:", error);
            }
        };

        if (userData?.access_token) {
            fetchData();
        }
    }, [userData]);


    async function handelSkip (e) {
        e.preventDefault();
        
        if (selectedTopics.length < 3) {
            setError("Please select at least 3 topics.");
            toast.error("Please select at least 3 topics.")
            return;
        }

        if(selectedTopics.length >=3){
            setLoading(true);
            const response = await axios.get(`${process.env.API_URL}/api/v1/u/topics`, {
                headers: {
                    Authorization: `Bearer ${userData?.access_token}`
                }
            });

            if(response.data.result.interested_in.length >=3){
                setLoading(false);
                toast.success("Your topics are selected")
                router.push("/");
                return;
            }else{
                setLoading(false);
                setError("Click on Next button");
                toast.error("Click on Next button")
                return;
            }
        }

    }

    // Handle form submission
    async function handelSubmit(e) {
        e.preventDefault();
        setLoading(true);
        let loading = toast.loading("Your interest saving...")
        try {
            const response = await axios.post(`${process.env.API_URL}/api/v1/u/topics`,
                { topicArray: selectedTopics },
                {
                    headers: {
                        Authorization: `Bearer ${userData?.access_token}`
                    }
                }
            );

            if(response){
                setSelectedTopics(response.data.result.interested_in);
                toast.success("Your topics are selected")
                setTimeout(() => {
                    toast.dismiss(loading);
                    setLoading(false);
                    // router.push("/");
                    dispatch(disable())
                }, 3000);
            }
        } catch (error) {
            throw error;
            toast.dismiss(loading);
            setError("Something went wrong");
            toast.error("Something went wrong");

        }
      
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!userData?.access_token) {
                router.push("/u/signup");
            }
        }, 5000);
        return () => clearTimeout(timer);

    }, [userData, router]);



    const handleTopicChange = (topic, isSelected) => {
        setSelectedTopics(prevState => {
            if (isSelected) {
                return [...prevState, topic];
            } else {
                return prevState.filter(t => t !== topic);
            }
        });
    };

    return (
        <AuthLayer>
            {userData?.access_token ? (
                <div className="w-full h-full relative bg-white flex flex-col items-center justify-start">
                    <div className="relative w-full h-full my-10 mb-24 px-[24px] md:w-[680px]">
                        <div className="text-center py-10">
                            <h2 className="text-[28px] font-serif">What are you interested in?</h2>
                            <p className="text-base mt-4">Choose three or more.</p>
                            <p className="text-base mt-4 text-red-600">{error}</p>
                        </div>
                        <form className="w-full relative h-auto flex flex-col items-center" onSubmit={handelSubmit}>
                            <div className="my-2 flex justify-center items-center flex-wrap gap-1 gap-y-2">
                                {topics.map(topic => (
                                    <CheckboxButton
                                        key={topic}
                                        value={topic}
                                        selected={selectedTopics.includes(topic)}
                                        onChange={handleTopicChange}
                                    />
                                ))}
                            </div>
                            <div className="fixed w-full bottom-0 py-4 bg-white border-t border-profileGrey flex justify-center items-center">
                                <button 
                                type="submit" 
                                disabled={selectedTopics.length < 3}
                                className="w-fit self-center bg-slate-950 disabled:bg-slate-500 hover:bg-slate-800 text-white py-2 px-6 rounded-full text-sm">
                                    {loading ? "Loading..." : "Next"}
                                </button>

                                <button 
                                disabled={selectedTopics.length < 3}
                                type="button"
                                onClick={handelSkip}
                                className="w-fit self-center text-green-700 hover:text-green-800 hover:underline  py-2 px-6 rounded-full text-sm disabled:hidden">
                                    skip
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </AuthLayer>
    );
}
