import { useState } from "react";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    console.log(event);
    event.preventDefault(); 

    if (password !== confirmPassword) {
      // If passwords do not match, set an error message and stop the form submission
      setError("Passwords do not match.");
      return;
    }

    setError("");

    const userData = {
      name,
      email,
      password,
      confirmPassword,
    };


    try {
      const response = await fetch('/api/register', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(userData), 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); 
      console.log(data); 
      
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };
  return (
    <div className="login-page">
      <h2>Register</h2>
      <form className="login-form" onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
        <label htmlFor="name">Username</label>
        <input
          value={name}
          name="name"
          id="name"
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="******"
          id="password"
          name="password"
        />
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="******"
          id="confirmPassword"
          name="confirmPassword"
        />

        <button className="submit-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
