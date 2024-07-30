import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import defaultpic from "../assets/defaultuser.png";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from 'react';
import PostCard from "../components/PostCard";
import { useDispatch } from "react-redux";
import {
  createPostFailed,
  createPostStart,
  createPostSuccess,
  fetchingPostFailed,
  fetchingPostStart,
  fetchingPostSuccess,
  loadingImageFailed,
  loadingImageStart,
  loadingImageSuccess
} from "../redux/postSlice";
import { IPost } from "../interface/IPost";
import { storage } from "../googlefirebase/InitFireBase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

const Timeline: React.FC = () => {
  const { currUser } = useSelector((state: RootState) => state.user);
  const currPostState = useSelector((state: RootState) => state.post);

  interface PostForm {
    content: string;
    image?: string | null;
    userId: string;
    userPic?: string;
    userName: string;
  }

  const dispatch = useDispatch(); // interact with the redux store
  const [limit, setLimit] = useState<number>(140); // char limit
  const [postList, setPostList] = useState<Array<IPost>>([]); // list of posts

  // State for profile picture
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFileURL, setImageFileURL] = useState<string | null>(null);
  const [pourcent, setPourcent] = useState<number>(0);
  const [url , setUrl] = useState<string | null>(null);
  const [form, setForm] = useState<PostForm>({
    content: "",
    userId: currUser ? currUser._id : "",
    userPic: currUser?.profilpicture ? currUser.profilpicture : defaultpic,
    userName: currUser ? currUser.username : "",
  });

  const TextArea = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCharLimit = () => {
    if (TextArea.current) {
      setLimit(140 - TextArea.current.value.length);
    }
  };

  const controller = new AbortController();

  // Call the API
  const getPost = async (signal: AbortSignal) => {
    try {
      dispatch(fetchingPostStart());
      const res = await fetch("/api/post/get", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${currUser?.token}`,
          "Content-Type": "application/json"
        },
        signal
      });
      if (!res.ok) {
        dispatch(fetchingPostFailed());
      }
      const data = await res.json();
      setPostList(data.reverse());
      dispatch(fetchingPostSuccess());
    } catch (e) {
      console.error(e);
    }
  };

  // Call the API on every update
  useEffect(() => {
    if (!currUser) return;
    getPost(controller.signal);
    return () => {
      controller.abort();
    };
  }, []);

  // Upload image
  const uploadImage = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!fileInputRef.current || !fileInputRef.current.files) return reject(new Error("No file selected"));
  
      dispatch(loadingImageStart());
      const selectedFile = fileInputRef.current.files[0];
      const imageID = uuidv4();
      const storageRef = ref(storage, "images/" + imageID);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPourcent(Math.round(progress));
        },
        (error) => {
          dispatch(loadingImageFailed());
          setImageFile(null);
          setImageFileURL(null);
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileURL(downloadURL);
            setForm({ ...form, image: downloadURL });
            dispatch(loadingImageSuccess());
            handleImageChange();
            resolve(downloadURL); // Resolve promise with the download URL
          }).catch((error) => {
            dispatch(loadingImageFailed());
            reject(error);
          });
        }
      );
    });
  };
  
  const handleImageChange =  () => {
    if (fileInputRef.current && fileInputRef.current.files) {
      const file = fileInputRef.current.files[0];
      setImageFile(file);
      setImageFileURL(URL.createObjectURL(file));
       // Preview the selected image
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    setForm({ ...form, [e.currentTarget.id]: e.currentTarget.value });
    handleCharLimit();
  };

  if (!currUser) return null; // because the user can be null

  // Create the post
  const createPost = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
  
    if ((!form.content && !imageFile) || form.content.length > 140) return;
  
    try {

        let imageUrl = "";
        if (imageFile && !imageUrl) {
          imageUrl = await uploadImage();
        }
        if (currPostState.error) return;


        dispatch(createPostStart());
  
        const res = await fetch("/api/post/create", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${currUser.token}`
          },
          body: JSON.stringify({...form , ['image'] : imageUrl})
        });
  
        if (!res.ok) {
          console.error("Error occurred in the creation of the post");
          dispatch(createPostFailed());
        } else {
          dispatch(createPostSuccess());
          getPost(controller.signal);
        }
      
    } catch (error) {
      console.error(error);
    }

    e?.currentTarget.reset()
    setForm({
      content: "",
      userId: currUser ? currUser._id : "",
      userPic: currUser?.profilpicture ? currUser.profilpicture : defaultpic,
      userName: currUser ? currUser.username : "",
    })
  };


  return(
    <>
     <div className="flex flex-col gap-2 ps-0 md:ps-40 lg:ps-24">
      {/*post form */}
      <div>
        <div className="flex rounded-lg bg-neutral-400 bg-opacity-10 h-1/6 px-6 py-3">
          <div className="flex items-center h-full justify-center">
           <img
            src={currUser.profilpicture ? currUser.profilpicture : defaultpic}  alt="userpicture"  className="min-w-10 w-16 rounded-full border border-fluo p-1 mb-4"/>
          </div>

          <form onSubmit={createPost} className="flex flex-col gap-2 w-full px-5">
              <textarea ref={TextArea} maxLength={140} minLength={1} onChange={handleChange}  name="content" id="content" className="w-full bg-neutral-500 bg-opacity-30 rounded-lg py-2 px-2 text-white placeholder:text-sm" placeholder="What's happening ?"/>      
               
             <div className="flex flex-col md:flex-row justify-between flex-wrap">

                  {/* add image */}
                      <div className="flex items-center" >
                        <FontAwesomeIcon icon={faImage} style={{color: "#ffffff"}} />
                          <div className="flex items-center ">
                            <input onChange={handleImageChange}  ref={fileInputRef} type="file"  accept='image/*'  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg text-white " />
                          </div>    
                        </div>

                   {/* submit btn */}
                      <div className="flex justify-end pe-3 items-center">
                          {limit != 140 && <p className="text-red-700 text-[.8rem] animate-fade pe-5">{limit} remaining characters </p>}
                          <button 
                            type="submit" 
                              className={`bg-fluo font-pixelify w-fit px-3 rounded transition-all 
                                ${limit == 140 && !imageFileURL ? "hover:bg-none hover:text-none opacity-60 cursor-not-allowed" : "hover:bg-blue-900 hover:text-white"}`} 
                              disabled={(limit == 140 && !imageFileURL) || currPostState.loading}>
                              bam it
                            </button>         
                    </div>

              </div>

          {imageFileURL && <div className="w-full flex justify-center h-64"> 
              <img src={imageFileURL} alt="uploaded image" className="object-cover spect-square rounded w-96"/>
              </div>}

            </form>
        </div>
      </div>

       {/*post list */}
      <div>
        {/*loading animation */}
      {currPostState.loading && 
                    <div className='flex space-x-1 justify-center items-center pt-10'>
                        <span className='sr-only '>Loading...</span>
                        <p className="font-pixelify text-2xl text-white">loading</p>
                        <div className='h-3 w-3 bg-white text-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                        <div className='h-3 w-3 bg-white text-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                       <div className='h-3 w-3 bg-white text-white rounded-full animate-bounce'></div>
                    </div>
                    }
                    
       {postList &&
          postList.map((post :IPost , index :number) =>(
            <PostCard key={index} _id={post._id}
              content ={post.content}
              image={post.image}
              like={post.like}
              userName={post.userName}
              repost={post.repost}
              userId={post.userId}
              userPic={post.userPic}
              createdAt={post.createdAt}/>
          ))
       }

       {postList.length == 0 &&
        <div className='flex space-x-1 justify-center items-center pt-10'>
          <span className='sr-only '>no post one the page</span>
          <p className="text-white text-xl"> There's no post 😭</p>
        </div>
        }

      </div>


     </div>
    </>
  )
}

export default Timeline