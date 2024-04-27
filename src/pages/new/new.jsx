import "./New.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { collection, addDoc, setDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth, db, storage } from "../../firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({})
  const [per, setPerc,] = useState(null);
  const [dataSaved, setDataSaved] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    if(dataSaved){
        // Show a success toast notification
        toast.success('Data saved successfully!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    }
  },[dataSaved])

  useEffect(() => {
    // Update the uploadFile function in your form component to include uploading the image to Firebase Storage
    const uploadFile = () => {
      const name = new Date().getTime() + file.name
      console.log(name)
       // Upload the image to Firebase Storage
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setPerc(progress)
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
            // Get the download URL of the uploaded image
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            //Update the user object with the download URL
          setData((prev)=>({...prev, img: downloadURL}))
          });
        }
      );
    };
    file && uploadFile();
  }, [file])

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value })
  }
  console.log(data)

  const handleAdd = async (e) => {
    e.preventDefault()

    try {
        // Proceed with adding other user data to the database
      const res = await createUserWithEmailAndPassword(auth,
        data.email,
        data.password);

      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });

      setDataSaved(true);

      setTimeout(()=>{
        navigate(-1)
      },3000)
   
      
    } catch (err) {
      console.log(err);
       // Show an error toast notification
    toast.error('An error occurred while saving data.', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    }
  };

  return (
    <div className="new">
      <ToastContainer/>
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleInput}
                  />
                </div>
              ))}
              <button disabled={per != null && per<100} type="submit" >Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;