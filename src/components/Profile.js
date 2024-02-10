import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import "./Profile.css"; // Make sure this import is correct
import axios from "axios";
import Layout from "./Layout";
import pfimg from "../images/profile.jpg";
import ip from '../ipaddr.js'


const Profile = () => {
  const [disable, setDisable] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [photoSrc, setPhotoSrc] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [disableUpdate, setDisableUpdate] = useState(false);
  const [disableSave, setDisableSave] = useState(true);
  const [disableChooseFile, setDisableChooseFile] = useState(true);

  const navigate = useNavigate()
  const userId = localStorage.getItem("userId");

  const handleUpdate = () => {
    setDisableUpdate(true);
    setDisableSave(false);
    setDisable(false);
    setDisableChooseFile(false);
  };

  const handlePhotoChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setPhoto(selectedFile);
      previewProfilePicture(selectedFile);
      setIsImageChanged(true);
    } else {
      console.error("Invalid file type. Please select an image.");
    }
  };

  const previewProfilePicture = (file) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      setPhotoSrc(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const formData = {
      first_name: document.querySelector('[name="first_name"]').value,
      last_name: document.querySelector('[name="last_name"]').value,
      email: document.querySelector('[name="email"]').value,
    };

    console.log("Form Data:", formData);

    try {
      const response = await axios.post(
        `http://${ip}:8000/api/update/${userId}`,
        formData
      );

      console.log(response.data);
      setDisable(true);

      await fetchUserData();

      if (photo) {
        console.log("Uploading photo:", photo);
        await handleUpload();

        const reader = new FileReader();
        reader.onloadend = async () => {
          setPhotoSrc(reader.result);
          setIsImageChanged(false);
        };
        reader.readAsDataURL(photo);
      }
    } catch (err) {
      console.log(err);
    }

    setDisableUpdate(false);
    setDisableSave(true);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("photo", photo);

    try {
      const response = await axios.post(
        `http://${ip}:8000/api/upload/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Photo uploaded successfully:", response.data);

      const uploadedPhotoSrc = response.data;
      setPhotoSrc(uploadedPhotoSrc);
      setIsImageChanged(false);
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };
  const handleDelete = async() =>{
    if(confirm("Are You Sure You want to delete Account?")===true)
    {

    
    try {
      // Make a DELETE request to the deleteUserProfile API endpoint
      const response = await axios.delete(`http://${ip}:8000/api/delete/${userId}`);
      
      // Check if the request was successful
      if (response.status === 204) {
        console.log('User profile deleted successfully.');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('csrf_token');
        navigate('/login')
        // Perform any additional actions you want after successful deletion
      } else {
        console.error('Failed to delete user profile:', response.data.error);
      }
    } catch (error) {
      console.error('Error occurred while deleting user profile:', error);
    }
    
  }
  };


  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://${ip}:8000/api/userprofile/${userId}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Fetched user data:", data);

      setFirstName(data.first_name);
      setLastName(data.last_name);
      setUsername(data.username);
      setEmail(data.email);
       
      if (data.photo != null){
      const completePhotoUrl = `http://${ip}:8000${data.photo}`;
      setPhotoSrc(completePhotoUrl);
      }

      setIsImageChanged(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

 
  return (
    <>
   
   <Layout>
        <div className="container shadow rounded mt-5 mb-5 profile-container">
          
            <div className="col-md-12">
              <div className="d-flex p-3 top-container">
                
                <div className="d-flex align-items-center row">
                  
                  <div className="profile-image-container">
                    <img
                      className="rounded-circle"
                      width="160px"
                      height="160px"
                      src={photoSrc || pfimg}
                      alt="Profile"
                    />
                  </div>
                  <div className="profile-info-container ">
                    <strong className="text-black-50">{username}</strong>
                  </div>
                  
                  {disableUpdate ? (
                  <div className="upload-photo">
                    <label className="upload">
                      <input
                        className="uploaded"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        disabled={disableChooseFile}
                        id="profilePictureInput"
                        style={{disable:"hidden"}}
                      />
                      
                      
                    </label>
                  </div>
                ) : null}
                </div>
                
               
              </div>
              <hr className="divider" />
            
            <div className="col-md-12">
              <div className="p-3 py-5 bottom-container">
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="first name"
                      defaultValue={firstName}
                      disabled={disable}
                      name="first_name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">Last Name</label>
                    <input
                      type="text"
                      className="form-control "
                      placeholder="last name"
                      defaultValue={lastName}
                      disabled={disable}
                      name="last_name"
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Email ID</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter email id"
                      defaultValue={email}
                      disabled={disable}
                      name="email"
                    />
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <button
                    className="btn btn-outline-primary profile-button"
                    type="button"
                    onClick={handleUpdate}
                    disabled={disableUpdate}
                  >
                    Update Profile
                  </button>
                  <button
                    className="btn btn-outline-primary profile-button"
                    type="submit"
                    onClick={handleSave}
                    disabled={disableSave}
                  >
                    Save Profile
                  </button>
                  <button
                    className="btn btn-outline-danger profile-button"
                    type="button"
                    onClick={handleDelete}                    
                  >
                    Delete Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
