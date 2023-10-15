import { useState } from "react";
import { useCookies } from "react-cookie"

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  

  console.log(email, password, confirmPassword);
  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };
  const handleSubmit = async (e, endpoint) => {
    try {
       
      e.preventDefault();
      if (!isLogin && password !== confirmPassword) {
        setError("Make sure password match!");
        return new Error("Password do not match");
      }
      
      const response = await fetch(`http://localhost:8000/${endpoint}`,{
        method:"POST",
        headers:{"Content-Type": "application/json" },
        body:JSON.stringify({email,password}),
      });
      console.log("hi")
      console.log(response.status)
      const data = await response.json();
      if(data.detail){
        setError(data.detail)
      }else{
        
        setCookie('user_email', data.email)
        setCookie('AuthToken', data.token)
        window.location.reload()
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="authCointer">
      <div className="auth-container-box">
        <form>
          <h2>{isLogin ? "Please log in" : "Please sign up"}</h2>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input
            type="submit"
            className="create"
            onClick={(e) => handleSubmit(e, isLogin ? "login" : "signup")}
          />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options"></div>
        <button
          onClick={() => viewLogin(false)}
          style={{ color: isLogin ? "#000" : "#ccc" }}
          className="auth-options-button"
        >
          Sign up
        </button>
        <button
          onClick={() => viewLogin(true)}
          style={{ color: !isLogin ? "#000" : "#ccc" }}
          className="auth-options-button"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Auth;
