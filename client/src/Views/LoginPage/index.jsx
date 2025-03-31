import "./index.css";
import { MdEmail, MdLock } from "react-icons/md";
import { PiHandshakeFill } from "react-icons/pi";
const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <PiHandshakeFill className="icon" />
        <h2 className="title">اهلا بكم في قسم</h2>
        <h3 className="subtitle">العلاقات العامه</h3>
        <p className="desc">يرجى تسجيل الدخول للوصول إلى حسابك</p>

        <label className="input-label" htmlFor="email">البريد الإلكتروني</label>
        <div className="input-group">
          <MdEmail className="input-icon" />
          <input type="text" id="email" placeholder="أدخل بريدك الإلكتروني" />
        </div>

      
        <label className="input-label" htmlFor="password">كلمة المرور</label>
        <div className="input-group">
          <MdLock className="input-icon" />
          <input type="password" id="password" placeholder="أدخل كلمة المرور" />
        </div>

        <div className="extras">
          <label>
            <input type="checkbox" /> تذكرني
          </label>
          <a href="#" className="forgot-password">نسيت كلمة المرور؟</a>
        </div>

        <button className="login-button">تسجيل الدخول →</button>

        <p className="help-text">
          هل تحتاج مساعدة؟ <a href="#">اتصل بنا</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
