function createUserSession(req,user,action){
   req.session.uid = user._id.toString();
   req.session.save(action); // call back funcation will excute after save session
}

function destroyUserAuthSession(req){
req.session.uid = null; 
}
module.exports = {
    createUserSession,
    destroyUserAuthSession
}