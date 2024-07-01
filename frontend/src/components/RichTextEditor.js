import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // import styles


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']                                        
  ],
};

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

const RichTextEditor = ({value, setValue}) => {
  // const [value, setValue] = useState('');


  return (
    <div className="p-4 z-0">
      <ReactQuill
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder='Tell your story...'
        className=' font-Charter h-auto w-full rounded-lg '
      />
      
    </div>
  );
}

export default RichTextEditor;
