import { useState } from 'react';
import { useCookies } from 'react-cookie';

const Auth = () => {
  const [, setCookie] = useCookies(['AuthToken']);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const endpoint = isLogin ? 'login' : 'signup';
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include cookies in requests
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Authentication failed');
      }

      setCookie('Email', data.email);
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form onSubmit={handleSubmit}>
          <h1>{isLogin ? 'Please log in' : 'Please sign up'}</h1>
          <input 
            type="email" 
            placeholder="Email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input 
              type="password" 
              placeholder="Confirm Password" 
              required 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <button type="submit" className="create">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
          {error && <p className="error-message">{error}</p>}
          <div className="auth-options">
            <button 
              type="button"
              onClick={() => setIsLogin(false)} 
              style={{ backgroundColor: !isLogin ? '#fff' : '#ccc' }}
            >
              Sign Up
            </button>
            <button 
              type="button"
              onClick={() => setIsLogin(true)} 
              style={{ backgroundColor: isLogin ? '#fff' : '#ccc' }}
            >
              Log In
            </button>  
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
