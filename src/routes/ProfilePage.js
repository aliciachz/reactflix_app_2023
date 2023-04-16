import React, { useState, useEffect } from 'react';
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import 'styles/ProfilePage.scss';

const ProfilePage = ({ userObj, setUserObj }) => {
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userObj) {
      setUsername(userObj.displayName);
      setAvatar(userObj.photoURL);
    }
  }, [userObj]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSaveUsername = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      await updateProfile(currentUser, { displayName: username });
      setUserObj({ ...userObj, displayName: username });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setIsUploading(true);
      const storage = getStorage();
      const file = e.target.files[0];
      console.log('Selected file:', file);
      const filename = `${Date.now()}_${file.name}`;
      const fileRef = ref(storage, `images/${filename}`);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on('state_changed', (snapshot) => {
      }, (error) => {
        console.error(error);
        setIsUploading(false);
      }, async () => {
        const downloadURL = await getDownloadURL(fileRef);
        setAvatar(downloadURL);

        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (currentUser) {
          await updateProfile(currentUser, { photoURL: downloadURL });
          setUserObj({ ...userObj, photoURL: downloadURL });
        }

        setIsUploading(false);
      });
    }
  };

  const handleLogOut = async () => {
    await signOut(getAuth());
    navigate('/');
  };

  return (
    <div className="profile-page">
      <h2 className='blind'>Edit Profile</h2>
      <div className="edit-image">
        <label className='blind'>Profile Image:</label>
        <img src={avatar} alt="Profile" />
        <label htmlFor="file-uploader" className="profile__change-avatar">
          Change Avatar
        </label>
        <input
          id="file-uploader"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        {isUploading && <p style={{color: '#fff'}}>Uploading...</p>}
      </div>
      <div className="edit-name">
        <label style={{color: '#fff'}}>Username:</label>
        <input type="text" value={username} onChange={handleUsernameChange} />
        <button onClick={handleSaveUsername}>Save</button>
      </div>
      <button onClick={handleLogOut} className='log-out'>Log Out
      </button>
    </div>
  );
};

export default ProfilePage;



