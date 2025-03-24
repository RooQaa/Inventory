import React from 'react'
import './LoginPage.css'
import { LuUserRound } from "react-icons/lu";
import { IoLockClosed } from "react-icons/io5";
const LoginPage = () => {
  return (
    <div className='wrapper'>
      <div className="form-box login">
        <form action="">
            <h1>تسجيل الدخول</h1>
            <div className="input-box">
              <input type="text" placeholder="اسم المستخدم" required/>
              <LuUserRound className='icon'/>
            </div>
            <div className="input-box">
              <input type="password" placeholder="كلمة المرور" required/>
              <IoLockClosed className='icon' />
            </div>
            <div classname="remember-me">
              <input type="checkbox" id="remember-me"/>
              <label for="remember-me">تذكرني</label>
            </div>
            <button type="submit">تسجيل الدخول</button>
        </form>
      </div>
    </div>
  )
}
export default LoginPage