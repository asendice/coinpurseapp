import React from 'react';

const Register = ({ email, user, pass, confirmPass, setEmail, setUser, setPass, setConfirmPass, onPress }) => {

    
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleUser = (e) => {
        setUser(e.target.value);
    }
    const handlePass = (e) => {
        setPass(e.target.value);
    }
    const handleConfirmPass = (e) => {
        setConfirmPass(e.target.value);
    }
    


    return(
        <div className="ui card">
            <div className="content">
                <div className="header">REGISTER</div>
            </div>
            <div className="content">
                <div className="ui form">
                    <div className="field">
                        <label>Email</label>
                        <input onChange={handleEmail} type="text" value={email} placeholder="email"  />
                    </div>
                    <div className="field">
                        <label>Set Username</label>
                        <input onChange={handleUser} type="text" value={user} placeholder="username"  />
                    </div>
                    <div className="field">
                        <label>Set Password</label>
                        <input onChange={handlePass} type="text" value={pass} placeholder="password"  />
                    </div>
                    <div className="field">
                        <label>Confirm Password</label>
                        <input onChange={handleConfirmPass} type="text" value={confirmPass} placeholder="confirm password"  />
                    </div>
                    <div onClick={onPress} className="ui button orange ">Register</div>
                </div>
            </div>
        </div>
    ) 
}

export default Register;