import React from 'react';
import './LoginPage.css';
import { LuUserRound } from "react-icons/lu";
import { IoLockClosed } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import heroImage from "../Assets/hero-img.jpg";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/admin-dashboard");
  };

  return (
    <div className='container'>
    
      <div className="wrapper">  
        <div className="header">قسم العلاقات العامه</div>
        <div className="form-box login">
          <form onSubmit={handleLogin}>
            <h1>تسجيل الدخول</h1>
            <div className="input-box">
              <input type="text" placeholder="اسم المستخدم" required />
              <LuUserRound className='icon' />
            </div>
            <div className="input-box">
              <input type="password" placeholder="كلمة المرور" required />
              <IoLockClosed className='icon' />
            </div>
            <button type="submit">تسجيل الدخول</button>
          </form>
        </div>
      </div>
      <div className="wrapper hero-wrapper">
        <h1 className="hero-comp-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit!</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae 
          sapien at erat gravida fermentum. Nulla facilisi. Curabitur luctus, nulla ut 
          suscipit gravida, nunc eros sodales nisl, ut sodales libero metus in lacus. 
          Morbi feugiat, nisl a auctor varius, velit elit feugiat felis, vel hendrerit 
          nunc nisl eu libero.
        </p>
        <img src={heroImage} alt="Hero Illustration" className="hero-image" />
      </div>
    </div>
  );
};

export default LoginPage;
