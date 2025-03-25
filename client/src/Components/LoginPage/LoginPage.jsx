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
        <h1 className="hero-comp-text">مرحبًا بك في موقعنا! نوفر لك أفضل الحلول الإبداعية لتجربة تصميم فريدة.
        </h1>
        <p>لوريم إيبسوم هو نص شكلي يستخدم في صناعة الطباعة والنشر. كان لوريم إيبسوم هو النص الوهمي 
          القياسي في هذه الصناعة منذ القرن الخامس عشر، عندما قامت مطبعة مجهولة بتجميع مجموعة من النصوص عشوائياً لإنشاء كتاب نماذج. لم يتغير لوريم إيبسوم كثيرًا منذ ذلك الحين، بل تم استخدامه في الطباعة الإلكترونية أيضاً. انتشر النص الوهمي مع ظهية قبل اعتما النصوص الفعلية.</p>
        <img src={heroImage} alt="Hero Illustration" className="hero-image" />
      </div>
    </div>
  );
};

export default LoginPage;
