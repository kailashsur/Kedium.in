import { GetServerSideProps } from "next";

interface DashboardProps {
    username: string;
  }
  
  export default function Home({ username }: DashboardProps) {
    
  
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Welcome, {username}!</p>
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