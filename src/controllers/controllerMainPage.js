exports.index = (req, res) => {
    if (req.session.user) {
        return res.redirect('/myAgenda');
    }
    res.render('includes/index');
}