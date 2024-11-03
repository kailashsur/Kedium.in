import { GetServerSideProps } from "next";

interface UserProps {
    username: string;
  }
  
  export default function User({ username }: UserProps) {
    
  
    return (
      <div>
        <h1>Home</h1>
        <p>Welcome, {username}!</p>

        <button
            onClick={() => {
                window.location.href = "/";
            }}
            className="bg-lime-500 hover:bg-lime-600 active:bg-lime-400 text-white font-bold py-2 px-4 rounded"
        >Back to Home</button>
      </div>
    );
  }



/** 
 *  serverside rendering
 */



export const getServerSideProps: GetServerSideProps = async (context) => {
    const { username } = context.params as { username: string };

    return {
        props: {
            username
        }
    }
};