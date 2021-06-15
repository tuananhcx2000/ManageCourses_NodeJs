class NewsController {
    // [get] /news
    index(req, res) {
        res.render('new');
    }
    // [get] /news/:slug
    show(req, res) {
        res.send('details news');
    }
    
}

module.exports = new NewsController();
