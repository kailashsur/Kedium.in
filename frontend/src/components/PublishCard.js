import Image from "next/image";
import { useState, useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import appwrite_client from "@/util/appwrite/appwrite";
import { ID } from "appwrite";
import { Appwrite_ImageID } from "@/lib/methods";

// Blog Mutation
const CREATE_BLOG_MUTATION = gql`
  mutation CreateBlog(
    $blog_id: String!
    $title: String!
    $thambnail: String
    $description: String
    $content: String
    $tags: [String]
    $draft: Boolean
  ) {
    createBlog(
      blog_id: $blog_id
      title: $title
      thambnail: $thambnail
      description: $description
      content: $content
      tags: $tags
      draft: $draft
    ) {
      title
      author {
        email
        fullname
        _id
      }
    }
  }
`;

export default function PublishCard({
  blog,
  setBlog,
  userData,
  togle,
  setTogle,
  info,
  slugID,
  setSlugID,
  color,
}) {
  const [thambnailUploaded, setThambnailUploaded] = useState(false);

  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const [input, setInput] = useState("");
  const [topics, setTopics] = useState([]); // all the topisc array

  // Graphql Mutation
  const [createBlog, { data, loading, error }] =
    useMutation(CREATE_BLOG_MUTATION);

  // Togle the Publish Card
  function toglePublishCard() {
    setTogle(!togle);
  }

  // Hande image upload
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // const reader = new FileReader();
    // reader.onloadend = () => {
    //     setImage(reader.result);
    // };
    // reader.readAsDataURL(file);

    const url = URL.createObjectURL(file);
    setImage(url);
    setThambnailUploaded(false);
  };
  // Handel Thambnail Upload TODO:
  async function handelUpload(e) {
    if (selectedFile && thambnailUploaded == false) {
      const uploading = toast.loading("Uploading");
      try {
        const imageID = Appwrite_ImageID(userData?.username);

        const response = await appwrite_client.uploadFile(
          selectedFile,
          imageID,
        );
        if (response) {
          const res = appwrite_client.previewFile(response.$id);
          setBlog({ ...blog, thambnail: res.href });

          toast.dismiss(uploading);
          toast.success("Photo uploaded");
          setThambnailUploaded(true);
        }
      } catch (error) {
        console.log("Error on uploading image = ", error);
        toast.dismiss(uploading);
        toast.error("error on uploading");
        setThambnailUploaded(false);
      }
    }
  }

  function handelOnChangeTitleInput(e) {
    setBlog({
      ...blog,
      title: e.target.value,
      blog_id: e.target.value
        .concat(" ", slugID.toLocaleLowerCase())
        .replace(/\s+/g, "-")
        .toLowerCase(),
    });
  }

  // Tag *********************************

  const handleKeyDown = (e) => {
    if (e.key === "," || (e.key === "Enter" && input.trim())) {
      e.preventDefault();
      setTopics([...topics, input.trim()]);
      setBlog({ ...blog, tags: [...topics, input.trim()] });
      setInput("");
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const removeTopic = (indexToRemove) => {
    setTopics(topics.filter((_, index) => index !== indexToRemove));
    setBlog({
      ...blog,
      tags: topics.filter((_, index) => index !== indexToRemove),
    });
  };
  // Tag end ************************************

  // Handel Submit
  async function handelSubmit() {
    if (image && blog.thambnail == "") {
      return alert("You didn't press upload button");
    }

    let loader = toast.loading("Publishing...");
    try {
      const response = await createBlog({
        variables: {
          blog_id: blog?.blog_id,
          title: blog?.title,
          thambnail: blog?.thambnail,
          description: blog?.description,
          content: blog?.content,
          tags: blog?.tags,
          draft: true,
        },
      });

      if (response) {
        toast.dismiss(loader);
        toast.success("Blog published successfully");

        setBlog({
          blog_id: "",
          title: "",
          thambnail: "",
          description: "",
          content: "",
          tags: [],
          draft: false,
        });
        setImage(null);
        setSlugID("");
        window.location.href = `/@${userData.username}/${blog?.blog_id}`;
        setTogle(false);
      }

      toast.dismiss(loader);
      // console.log("Blog created:", response.data.createBlog);
    } catch (error) {
      toast.dismiss(loader);
      toast.error("Error creating blog");

      setThambnailUploaded(false);
    }
  }

  return (
    <>
      <section className=" z-50 fixed top-0 left-0 bg-white/90 w-full h-full flex p-4 justify-center items-center flex-col sm:flex-row">
        {/* Story Preview  */}
        <div className=" relative w-full max-w-5xl sm:flex gap-20 bg-white p-4 border rounded-md">
          {/* togle of Publishing Card */}
          <span
            onClick={toglePublishCard}
            className=" absolute z-50 top-2 right-2 cursor-pointer p-1 bg-white rounded-full "
          >
            <svg className="svgIcon-use" width="29" height="29">
              <path
                d="M20.13 8.11l-5.61 5.61-5.609-5.61-.801.801 5.61 5.61-5.61 5.61.801.8 5.61-5.609 5.61 5.61.8-.801-5.609-5.61 5.61-5.61"
                fill-rule="evenodd"
              ></path>
            </svg>
          </span>

          {/* first section */}
          <div className=" flex justify-center items-center flex-col">
            {/* Image preview render */}
            <div className=" flex justify-center items-center flex-col w-full h-52 overflow-hidden rounded-sm ">
              <input
                type="file"
                accept="image/jpeg, image/png, image/jpg, image/gif"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />

              <div
                onClick={handleImageClick}
                className="bg-gray-100  flex justify-center items-center cursor-pointer"
                style={{ width: "100%", height: "100%" }}
              >
                {image ? (
                  <Image
                    src={image}
                    width={400}
                    height={400}
                    alt="Include a high-quality image in your story to make it more inviting to readers."
                    className="object-cover w-full h-full"
                  />
                ) : (
                  // <img
                  // src={image}
                  // alt="Thumnail"
                  // className="object-cover w-full h-full"
                  // />
                  <div className="text-gray-500">Click to select an image</div>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col gap-2 my-4">
              <input
                type="text"
                placeholder="Write a preview title..."
                value={blog?.title}
                onChange={handelOnChangeTitleInput}
                className=" outline-none border-b border-black/30 p-2 w-full "
              />
              <input
                type="text"
                placeholder="Write a preview subtitle..."
                value={blog?.description}
                onChange={(e) =>
                  setBlog({ ...blog, description: e.target.value })
                }
                className="outline-none border-b border-black/30 p-2 w-full"
              />

              <input
                type="text"
                placeholder="/blog/your-permalink"
                value={blog?.blog_id}
                onChange={(e) => setBlog({ ...blog, blog_id: e.target.value })}
                className="outline-none border-b border-black/30 p-2 w-full"
              />
            </div>

            <div className=" text-sm text-textGrey">
              <strong>Note:</strong>{" "}
              <span>
                Changes here will affect how your story appears in public places
                like Medium’s homepage and in subscribers’ inboxes — not the
                contents of the story itself.
              </span>
            </div>
          </div>

          {/* Publishing and tags */}
          <div className=" my-4 mt-6 flex flex-col gap-2 w-full">
            <div className="text-xl font-sans font-medium">
              Publising to:{" "}
              <strong className=" capitalize">
                {userData?.fullname.split(" ")[0]}
              </strong>
            </div>
            <div className="text-sm ">
              Add or change topics (up to 5) so readers know what your story is
              about
            </div>

            {/* ********************************************* */}
            <div className="w-full">
              <div className="outline-none text-sm border p-2 px-3 w-full bg-gray-100 flex flex-wrap items-center">
                {blog?.tags?.length > 0 &&
                  blog?.tags.map((topic, index) => (
                    <div
                      key={index}
                      className="bg-blue-200 text-blue-800 text-sm px-3 py-1 rounded-full mr-2 mt-2 flex items-center"
                    >
                      {topic}
                      <button
                        onClick={() => removeTopic(index)}
                        className="ml-2 text-blue-800"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                <input
                  type="text"
                  placeholder="Add topics"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="outline-none text-sm bg-gray-100 flex-grow flex items-center p-2"
                />
              </div>
            </div>
            {/* ********************************************* */}
            <div className=" text-sm text-textGrey font-medium">
              Learn more about what happens to your post when you publish.
            </div>

            {/* Submit Button of the card */}
            <div className=" flex gap-4 my-4 items-center">
              {/* upload thambnail */}
              <button
                className={`px-4 py-2 border rounded-full disabled:bg-rose-100 disabled:opacity-40 transition-all delay-75`}
                disabled={thambnailUploaded || image == null ? true : false}
                onClick={handelUpload}
              >
                {thambnailUploaded ? "Uploaded 👍 " : "Not Uploaded 😔"}
              </button>

              <button
                className={`px-4 py-2 text-sm  text-white rounded-full disabled:opacity-40`}
                style={{ backgroundColor: color }}
                disabled={blog?.title || !blog?.title == "" ? false : true}
                onClick={handelSubmit}
              >
                {blog?.draft ? "Update" : "Publish now"}
              </button>
              {/* Shadule for later */}
              <button className=" text-sm">Shadule for later</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
