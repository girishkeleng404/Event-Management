const logout = async(req,res)=>{
    req.logout((err) => {
        if (err) {
            return cb(err);
        }
        req.session.destroy((err) => {
            if (err) {
                return cb(err);
            }
            res.clearCookie('authToken', { path: '/' });
            res.clearCookie('connect.sid', { path: '/' });
            res.json({ message: 'Logged out successfully' });
        })
    })
}

export default logout;