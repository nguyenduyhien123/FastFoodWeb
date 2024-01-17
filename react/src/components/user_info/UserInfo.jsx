import axios from 'axios'
import { useEffect, useState } from 'react'
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import './UserInfo.scss'

export const UserInfo = () => {
    const [userInfo, setUserInfo] = useState({birthday : new Date()});
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/accounts/',
            withCredentials: true,          
        })
        .then(res => setUserInfo(res.data))
    }, []);
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUserInfo({...userInfo, [name] : value})
    }
    const handleSubmit = (e) => {
      e.preventDefault();
    }
    console.log(userInfo);
    return <div className="user-info mx-auto mt-5 w-50">
    <h1 className="text-center fs-1 text-dark">Thông tin tài khoản</h1>
       <form className='mt-4' onSubmit={handleSubmit}>
       <div class="mb-3 row">
    <label for="staticEmail" class="col-sm-4 col-form-label">Email</label>
    <div class="col-sm-8">
      <input type="text" class="form-control" id="staticEmail" name='email' onChange={handleChange} value={userInfo?.email || ''} />
    </div>
  </div>
  <div class="mb-3 row">
    <label for="inputFullname" class="col-sm-4 col-form-label">Họ và tên đệm</label>
    <div class="col-sm-8">
      <input type="text" class="form-control" id="inputFullname" name="fullname" onChange={handleChange} value={userInfo?.lastname || ""}/>
    </div>
  </div>
  <div class="mb-3 row">
    <label for="inputFullname" class="col-sm-4 col-form-label">Họ và tên</label>
    <div class="col-sm-8">
      <input type="text" class="form-control" id="inputFullname" name="fullname" onChange={handleChange} value={userInfo?.firstname || ""}/>
    </div>
  </div>
  <div class="mb-3 row">
    <label for="inputTel" class="col-sm-4 col-form-label">Số điện thoại</label>
    <div class="col-sm-8">
      <input type="text" class="form-control" id="inputTel" name="phonenumber" onChange={handleChange} value={userInfo?.phone || ""}/>
    </div>
  </div>
  <div class="mb-3 row">
    <label for="inputTel" class="col-sm-4 col-form-label">Ngày sinh</label>
    <div class="col-sm-8">
    <DatePicker name="date" onChange={(value) => {
        setUserInfo({...userInfo, birthday : value}) 
    }} value={userInfo?.birthday} format="dd/MM/y"/>
    <button type='submit' className="button-submit">Cập nhật tài khoản</button>
    </div>
  </div>
       </form>
    </div>
}