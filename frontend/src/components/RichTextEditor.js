import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // import styles
import { Appwrite_ImageID } from '@/lib/methods';
import appwrite_client from '@/util/appwrite/appwrite';
import toast from 'react-hot-toast';
import axios from 'axios';


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });


// Placeholder function for the image upload
async function uploadImage(formData) {
  // Add your image upload logic here and return the image URL
  // For now, just return a placeholder URL
  let image = formData.get('image')


  try {

    const res = await axios.get('/api/getcookie')
    
    const username = res?.data?.UserAuth?.username;


    const imageID = Appwrite_ImageID(username)

    const response = await appwrite_client.uploadFile(image, imageID)
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

  console.log("Image File 2= ", formData.get('image')); // Log the image file
}


const imageHandler = function () {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    const formData = new FormData();
    formData.append('image', file);

    console.log("Image File = ", formData.get('image')); // Log the image file

    try {
      // Replace this with your upload method
      const imageUrl = await uploadImage(formData);

      // Insert the uploaded image URL into the editor
      const range = this.quill.getSelection();
      this.quill.insertEmbed(range.index, 'image', imageUrl);
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };
};



// Customize the toolbar to handle image uploads


const RichTextEditor = ({ value, setValue, userData }) => {

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
