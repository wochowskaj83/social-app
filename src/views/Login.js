import './Login.css'

const Login = () => {
    return (
        <div className="container">
            <div className="header">
                <div className="text">Login</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input type="email" placeholder="Email" />
                </div>
                <div className="input">
                    <input type="password" placeholder="Password" />
                </div >
            </div >
            <div className="submit-container">
                <div className="submit">Login</div>
            </div>
        </div >

    )
}
export default Login;