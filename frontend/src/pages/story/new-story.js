
import RichTextEditor from '@/components/RichTextEditor';
import Head from 'next/head';



export default function NewStory() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Head>
        <title>Rich Text Editor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-3xl p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Rich Text Editor</h1>
        <RichTextEditor />
      </main>
    </div>
  );
}


