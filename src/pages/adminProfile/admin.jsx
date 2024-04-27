import React, { useState, useEffect } from 'react';
import {
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@mui/icons-material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import "./admin.scss";
import TextField from '@mui/material/TextField';
import { db, storage } from '../../firebase.config';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Admin() {
  const [file, setFile] = useState("")
  const [per, setPerc] = useState(null)
  const [adminData, setAdminData] = useState(null); // State to store admin data
  const [formData, setFormData] = useState(() => { // Retrieve form data from local storage or set initial values
    const storedFormData = JSON.parse(localStorage.getItem('formData'));
    return storedFormData || { fullname: '', username: '', role: '', email: '', phone: '', address: '', imageURL: '' }
  });
  const [imageUrl, setImageUrl] = useState('');


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const uploadFile = () => {
    if (file) {
      const name = new Date().getTime() + file.name
      console.log(name)
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('upload is ' + progress + '% done')
          setPerc(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('upload is paused');
              break;
            case 'running':
              console.log('upload is running')
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Get the download URL of the uploaded image
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // Update the user object with the download URL
            setImageUrl(downloadURL); // Update imageUrl after file upload
            setFormData((prevState) => ({
              ...prevState,
              imageURL: downloadURL
            }));
          }).catch((error) => {
            console.error("Error getting download URL: ", error);
          });
        }
      );
    }
  };


  useEffect(() => {
    const storedAdminData = JSON.parse(localStorage.getItem('adminData'))
    if (storedAdminData) {
      setAdminData(storedAdminData);
      // Set formData with the first item in adminData
      if (storedAdminData.length > 0) {
        const admin = storedAdminData[0];
        setFormData({
          fullname: admin.fullname,
          username: admin.username,
          role: admin.role,
          email: admin.email,
          phone: admin.phone,
          address: admin.address,
          imageURL: admin.imageURL
        });
        setImageUrl(admin.imageURL); // Update imageUrl with existing imageURL
      }
    }

  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const querySnapshot = await getDocs(collection(db, 'admin'));
      const existingData = querySnapshot.docs.map(doc => doc.data());
      const isDuplicate = existingData.some(item =>
        item.email === formData.email || item.username === formData.username
      )

      if (isDuplicate) {
        console.log('Duplicate date found. Not saving to Firebase')
        return;
      }

      // Save form data to Firebase
      await addDoc(collection(db, 'admin'), formData);
      console.log("Data saved successfully!");

      // Fetch latest data from Firebase
      await fetchData(); // Call fetchData to get the latest data
      toast.success('Data updated successfully!')

    } catch (error) {
      console.error("Error saving data: ", error);
      toast.error("An error occurred while updating data.")
    }
  };


  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'admin'));
      const data = querySnapshot.docs.map(doc => doc.data());

      setAdminData(data);
      localStorage.setItem('adminData', JSON.stringify(data)); // Store admin data in local storage
      // Retrieve the latest image URL from Firebase Storage
      const latestImageURL = data[0].imageURL;
      setImageUrl(latestImageURL);
      // Update form fields with fetched data
      if (data.length > 0) {
        const admin = data[0];
        setFormData({
          fullname: admin.fullname,
          username: admin.username,
          role: admin.role,
          email: admin.email,
          phone: admin.phone,
          address: admin.address,
          imageURL: admin.imageURL
        });
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    console.log("Fetching data on component mount...");
    // Fetch data when component mounts
    fetchData();
  }, []);

  // Reset form data when the component mounts and retrieve from local storage
  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem('formData'));
    if (storedFormData) {
      setFormData(storedFormData);
      console.log('Form data retrieved from local storage:', storedFormData);
    }
  }, []);

  // Persist form data in local storage when it changes
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
    console.log('Form data stored in local storage:', formData);
  }, [formData]);

  return (
    <div className="admin">
      <ToastContainer/>
      <h2 className="sectionTitle">Profile</h2>
      <div className="userTitleContainer">
      </div>
      <div className="userContainer">

        <div className="userShow">
          <div className="userShowTop">
            <img
              src={imageUrl || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              {adminData && adminData.length > 0 && ( // Check if adminData is not null and has data
                <>
                  <span className="userShowUsername">{adminData[0].fullname}</span> {/* Display the fullname */}
                  <span className="userShowUserTitle">{adminData[0].role}</span> {/* Display the role */}
                </>
              )}
            </div>
          </div>
          <div className="userShowBottom">

            <span className="userShowTitle">Account Details</span>
            {/* {adminData && adminData.map((admin, index) => ( */}
            <div className="userShowInfo" >
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{formData.fullname}</span>
            </div>

            <div className="userShowInfo">
              <AccountCircleOutlinedIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{formData.username}</span>
            </div>

            <div className="userShowInfo">
              <AddTaskOutlinedIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{formData.role}</span>
            </div>

            <span className="userShowTitle">Contact Details</span>

            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{formData.email}</span>
            </div>

            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{formData.phone}</span>
            </div>

            <div className="userShowInfo">
              <LocationOnOutlinedIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{formData.address}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle" style={{ marginLeft: '30px' }}>Edit</span>
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">

                <TextField
                  id="fullname"
                  label="Fullname"
                  variant="outlined"
                  placeholder="Hero Phrank"
                  className="userUpdateInput"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="userUpdateItem">

                <TextField
                  id="username"
                  label="Username"
                  variant="outlined"
                  placeholder="hero123"
                  className="userUpdateInput"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="userUpdateItem">

                <TextField
                  id="role"
                  variant="outlined"
                  label="Role"
                  placeholder="Software Engineer"
                  className="userUpdateInput"
                  value={formData.role}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="userUpdateItem">

                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  placeholder="annabeck99@gmail.com"
                  className="userUpdateInput"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="userUpdateItem">

                <TextField
                  id="phone"
                  label="Phone"
                  variant="outlined"
                  placeholder="+233 352 435 456"
                  className="userUpdateInput"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="userUpdateItem">

                <TextField
                  id="address"
                  label="Address"
                  variant="outlined"
                  placeholder="Pokuase | Ghana"
                  className="userUpdateInput"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={formData.imageURL || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    setFile(e.target.files[0])
                    uploadFile();
                  }}
                />
              </div>
              <button type="submit" className="userUpdateButton">
              {per !== null && per !== 100 ? `Upload Progress: ${per}%` : 'Update'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}