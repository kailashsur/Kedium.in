import SearchBox from "@/components/SearchBox";
import Layout from "@/Layout/Layout";
import AuthLayer from "@/Layout/AuthLayer";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";


function Search() {


    return (
        <AuthLayer>
            <Layout>

                <section className=" relative m-6 h-full min-h-screen ">

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