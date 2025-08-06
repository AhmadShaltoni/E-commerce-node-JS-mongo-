function handleError(err, req, res, next) {
    
    if(err.code === 404){
        return res.status(404).render('shared/404');
    }
    console.error('Error occurred:', err);
    res.status(500).render('shared/500');
}

module.exports = handleError;
