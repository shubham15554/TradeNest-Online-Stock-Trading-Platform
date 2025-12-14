import React, { useState , Navigate } from "react";
import axios from "axios"
import {toast} from 'react-toastify';
function Main() {

    const [form , setForm] = useState({username : "" , email : "" , password: "" });

    function handleChange(e){
        setForm({...form , [e.target.name] : e.target.value });
    }

    async function  onSubmit(e){
        e.preventDefault(); 
        console.log(form);
        let res = await axios.post("http://localhost:3002/user/login" , form ,);

        if(res.data.success){
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            window.location.href = `http://localhost:3001?token=${res.data.token}`;      // dashboard
        }
        else {
            console.log("login fail" , res.data.success);
            toast.error(res.data.message);
        }
        setForm({username : "" , email : "" , password: "" });
       
    }
    return ( 
        <div className="container">
            <div className="row">
                <div className="col-6 mt-5 mb-5">
                    <img src="media\images\account_open.svg"/>
                </div>

                <div className="col-4 mt-5 offset-2">
                    <form onSubmit={onSubmit}>
                        <h2>Login Now</h2>
                        <div className="input-group mb-3 mt-5">
                            <span className="input-group-text" id="basic-addon1">@</span>
                            <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" value={form.username} onChange={handleChange} name="username" required/>
                        </div>
                        <div className="input-group mb-3">
                            <input name="email" type="email" className="form-control" placeholder="Recipient’s Email" aria-label="Recipient’s username" aria-describedby="basic-addon2" value={form.email} onChange={handleChange} required/>
                            <span className="input-group-text" id="basic-addon2">@example.com</span>
                        </div>
                        <div className="input-group mb-3 mt-3">
                            <span className="input-group-text" id="basic-addon1">Password</span>
                            <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" value={form.password} onChange={handleChange} name="password" required/>
                        </div>
                        <button className="btn btn-primary" type="submit">Login</button>
                    </form>
                </div>


            </div>
           
        </div>
     );
}

export default Main;