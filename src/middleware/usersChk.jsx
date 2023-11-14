const userChk=(req,res,next)=>{
    if(!req.session.loggedin)
    {
        next();
    }
    else{
        res.redirect("/userdashboard")
    }
}

module.exports=userChk;