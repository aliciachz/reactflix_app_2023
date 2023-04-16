import React from 'react';
import { GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { authService } from '../fbase';
import "styles/Auth.scss"
import AuthForm from 'components/AuthForm';

function Auth() {
  const onSocialClick = (e) => {
    console.log('e.target.name->', e.target.name);
    const { target: { name } } = e;
    let provider;

    if (name === 'google') {
      provider = new GoogleAuthProvider();
    } else if (name === 'facebook') {
      provider = new FacebookAuthProvider();
    }

    signInWithPopup(authService, provider);
  };

  return (
    <div className="auth-container">
      <div className='back'>
      <h1><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png' alt='netflix-logo'/></h1>
      <AuthForm />
      <button onClick={onSocialClick} name="google" className="auth-btn">
        Sign in with Google <img src='https://seeklogo.com/images/N/new-google-favicon-logo-5E38E037AF-seeklogo.com.png' alt='google-logo' className='google'/>
      </button>
      <button onClick={onSocialClick} name="facebook" className="auth-btn">
        Sign in with Facebook <img src='https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png' alt='facebook-logo' className='facebook'/>
      </button>
      </div>
    </div>
  );
}

export default Auth;

