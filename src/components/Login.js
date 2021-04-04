import React from 'react';


const Login = ({setLogUser, setLogPass, logUser, logPass, onLogPress}) => {

    const handleUser = (e) => {
        setLogUser(e.target.value);
    }

    const handlePass = (e) => {
        setLogPass(e.target.value);
    }

    return(
        <div className="ui card">
            <div className="content">
                <div className="header">Login</div>
            </div>
            <div className="content">
                <div className="ui form">
                    <div className="field">
                        <label>Username</label>
                        <input onChange={handleUser} type="text" value={logUser} placeholder="username"  />
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input onChange={handlePass} type="text" value={logPass} placeholder="password"  />
                    </div>
                    <div onClick={onLogPress} className="ui button primary ">Login</div>
                </div>
            </div>
        </div>
    )
}

export default Login;