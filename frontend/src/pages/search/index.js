import SearchBox from "@/components/ui/SearchBox";
import Layout from "../Layout";
import AuthLayer from "../AuthLayer";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";


function Search() {


    return (
        <AuthLayer>
            <Layout>

                <section className=" relative m-6 h-full ">

                    <SearchBox className={" sm:hidden w-auto h-11 bg-white border border-profileGrey y-6 "} />

                    <div className="w-auto h-11 my-6 text-2xl font-semibold text-black ">
                        Recent searches
                    </div>

                    <div className="w-auto h-11 text-black ">
                        You have no recent searches
                    </div>

                </section>
            </Layout>
        </AuthLayer>
    )
}

export default Search;