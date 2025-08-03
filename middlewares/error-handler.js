function handleError(err, req, res, next) {
    console.error('Error occurred:', err);
    res.status(500).render('shared/500');
}

module.exports = handleError;
