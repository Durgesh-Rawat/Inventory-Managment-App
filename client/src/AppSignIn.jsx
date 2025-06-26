import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';


function AppSignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
     const handleSignup = async () => {
         const res = await fetch('https://first-backend-deployment-nhp9.onrender.com/auth/signup',{
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({ email, password }),
         });

          const data = await res.json();

        if (res.ok) {
            alert('Signup successful! You can now log in.');
            navigate('/login'); // Redirect to login page
         } else {
            alert(data.error); // Show error like "User already exists"
         }
     };


    return(
       <div class="form-container">
                <h2>Sign Up</h2>
                <input type="text" placeholder="Full Name" name="name" required />
                <input type="email" placeholder="Email" name="email" required onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" name="password" required onChange={e => setPassword(e.target.value)} />
                <button type="submit" onClick={handleSignup}>Sign Up</button>
                <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
}

export default AppSignIn
