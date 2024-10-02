import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // import styles
import { Appwrite_ImageID } from '@/lib/methods';
import appwrite_client from '@/util/appwrite/appwrite';
import toast from 'react-hot-toast';
import axios from 'axios';
import type Quill from 'quill';
import { Range } from 'react-quill';


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });



interface RichTextEditorProps {
    value: string;
    setValue: (value: string) => void;
}
interface FormData {
    get: (key: string) => any;
    append: (key: string, value: any) => void;
}

// Placeholder function for the image upload
async function uploadImage (formData : FormData) {
  // Add your image upload logic here and return the image URL
  // For now, just return a placeholder URL
  let image = formData.get('image')

  try {

    const res = await axios.get('/api/getcookie')
    const username = res?.data?.UserAuth?.username;
    const imageID = Appwrite_ImageID(username)
    const response = await appwrite_client.uploadFile(image, imageID);

    if (response) {
      const res = appwrite_client.previewFile(response.$id)
      toast.success("Photo uploaded")
      return res.href
    }
    else {
      return 'https://via.placeholder.com/150'
    }

  } catch (error) {

    toast.error("error on uploading")

  }

//   console.log("Image File 2= ", formData.get('image')); // Log the image file
}


const imageHandler = function (this : Quill) {
  const input : HTMLInputElement = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async () => {
    const file = input.files?.[0];
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append('image', file);

    // console.log("Image File = ", formData.get('image')); // Log the image file

    try {
      // Replace this with your upload method
      const imageUrl = await uploadImage(formData);

      // Insert the uploaded image URL into the editor
      const range : Range = this.getSelection();
      if(!range) return;
      this.insertEmbed(range.index, 'image', imageUrl);
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };
};



// Customize the toolbar to handle image uploads


const RichTextEditor : React.FC<RichTextEditorProps> = ({ value, setValue }) => {

  const modules = {
    toolbar: {
      container: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        'image': imageHandler
      }
    }
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];



  return (
    <div className=" my-6 font-Mori z-0">
      <ReactQuill
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder='Tell your story...'
        className=' font-Mori h-auto w-full rounded-lg '
      />

    </div>
  );
}

export default RichTextEditor;
