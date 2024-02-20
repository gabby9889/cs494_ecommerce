//create toekn and save in the cookie
export default(user, statuscode, res) => {
    //create jwt token
    const token = user.getJwtToken()

    //options for cookie
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    res.status(statuscode).cookie("token", token, options).json({
        token,

    });
    
};