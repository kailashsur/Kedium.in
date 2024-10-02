
import { CldImage, CldUploadWidget } from 'next-cloudinary';


// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
export default function Cloudinary() {
    return (
        <div className=' flex justify-center items-center p-10 h-full w-full '>

            <CldUploadWidget uploadPreset="<Your Upload Preset>">
                {({ open }) => {
                    return (
                        <button onClick={() => open()}>
                            Upload an Image
                        </button>
                    );
                }}
            </CldUploadWidget>



        </div>
    );
}