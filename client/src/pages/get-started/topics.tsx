import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import CheckboxButton from "@/components/checkbox";
import AuthLayer from "@/Layout/AuthLayer";
import axios from "axios";
import { disable } from "@/store/slices/authSlice";
import toast from "react-hot-toast";
import Loader from "@/components/ui/loader";
import { UserState } from "@/store/slices/userSlice";
import { PathState } from "@/store/slices/pathSlice";

export default function Topics() {

    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const userData = useSelector((state: { User: UserState }) => state.User.data);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const prevPath = useSelector((state: { Path: PathState }) => state.Path.toGoPath);

    const topicsArray: string[] = [
        "Amount", "Interest", "Time", "Period", "Web Development",
        "Web Design", "React Developer"
    ];
    const [topics] = useState<string[]>([...topicsArray]);
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

    // Fetch selected topics data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/u/topics`, {
                    headers: {
                        Authorization: `Bearer ${userData?.access_token}`
                    }
                });

                if (response.data) {
                    setSelectedTopics(response?.data?.result?.interested_in);
                }
            } catch (error) {
                console.error("Error fetching selected topics :: at topics.tsx");
            }
        };

        if (userData?.access_token) {
            fetchData();
        }
    }, [userData]);

    // Handle skipping the topic selection
    async function handelSkip(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        if (selectedTopics.length < 3) {
            setError("Please select at least 3 topics.");
            toast.error("Please select at least 3 topics.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/u/topics`, {
                headers: {
                    Authorization: `Bearer ${userData?.access_token}`
                }
            });

            if (response.data.result.interested_in.length >= 3) {
                setLoading(false);
                toast.success("Your topics are selected");
                router.push("/");
            } else {
                setLoading(false);
                setError("Click on the Next button.");
                toast.error("Click on the Next button.");
            }
        } catch (error) {
            setLoading(false);
            setError("Something went wrong while skipping.");
            toast.error("Something went wrong.");
        }
    }

    // Handle form submission
    async function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const loadingToast = toast.loading("Your interests are being saved...");
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/u/topics`,
                { topicArray: selectedTopics },
                {
                    headers: {
                        Authorization: `Bearer ${userData?.access_token}`
                    }
                }
            );

            if (response) {
                setSelectedTopics(response.data.result.interested_in);
                toast.success("Your topics are selected");
                setTimeout(() => {
                    toast.dismiss(loadingToast);
                    setLoading(false);
                    router.push(prevPath);
                    dispatch(disable());
                }, 3000);
            }
        } catch (error) {
            setLoading(false);
            setError("Something went wrong, unable to set topics.");
            toast.error("Something went wrong.");
            toast.dismiss(loadingToast);
        }
    }

    // Redirect to signup if not authenticated
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!userData?.access_token) {
                router.push("/u/signup");
            }
        }, 5000);
        return () => clearTimeout(timer);
    }, [userData, router]);

    // Handle topic selection changes
    const handleTopicChange = (topic: string, isSelected: boolean) => {
        setSelectedTopics((prevState) => {
            if (isSelected) {
                return [...prevState, topic];
            } else {
                return prevState.filter((t) => t !== topic);
            }
        });
    };

    return (
        <AuthLayer>
            {userData?.access_token ? (
                <div className="w-full h-full relative flex flex-col items-center justify-start select-none">
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
                                    className="w-fit self-center bg-primary-dart-background disabled:bg-primary-dart-background/50 hover:bg-slate-800 text-white py-2 px-6 rounded-full text-sm">
                                    {loading ? "Loading..." : "Next"}
                                </button>

                                <button
                                    disabled={selectedTopics.length < 3}
                                    type="button"
                                    onClick={handelSkip}
                                    className="w-fit self-center text-blue-600 hover:text-blue-700 font-bold hover:underline  py-2 px-6 rounded-full text-sm disabled:hidden">
                                    skip
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </AuthLayer>
    );
}
