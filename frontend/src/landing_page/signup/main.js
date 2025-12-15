import React, { useState  } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
  

function Main() {

    const [form , setForm] = useState({username : "" , email : "" , password: "" });
    const navigate = useNavigate();
    function handleChange(e){
        setForm({...form , [e.target.name] : e.target.value });
    }

        async function onSubmit(e) {
        try {
            e.preventDefault();
            let res = await axios.post("https://tradenest-online-stock-trading-platform.onrender.com/user/signup", form);

            if (res.data.user && res.data.success) {
            // Redirect to dashboard with tempKey instead of token
            window.location.href = `tradenest-dashboard.vercel.app?transfer_id=${res.data.tempKey}`;
            } else if (!res.data.user) {
            navigate("/signup");
            toast.error(res.data.message);
            } else {
            navigate("/signup");
            toast.error("Signup failed. Please try again.");
            }

            setForm({ username: "", email: "", password: "" });
        } catch (err) {
            navigate("/signup");
            toast.error("Signup failed. Please try again.");
            console.log(err.response);
        }
        }


    return ( 
        <div className="container">
            <div className="row">
                <div className="col-6 mt-5 mb-5">
                    <img src="media\images\account_open.svg"/>
                </div>

                <div className="col-4 mt-5 offset-2">
                    <form onSubmit={onSubmit}>
                        <h2>SignUp Now</h2>
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
                        <button className="btn btn-primary" type="submit">Create account</button>
                    </form>
                </div>


            </div>
           
        </div>
     );
}

export default Main;


         