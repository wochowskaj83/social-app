import './SignUp.css'

const SignUp = () => {
    return (
        <div className="container">
            <div className="header">
                <div className="text">Sign Up</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input type="text" placeholder="Name" />
                </div>
                <div className="input">
                    <input type="email" placeholder="Email" />
                </div>
                <div className="input">
                    <input type="password" placeholder="Password" />
                </div >
            </div >
            <div className="submit-container">
                <button className="submit btn">Sign Up</button>
            </div>
        </div >
    )
}

export default SignUp;