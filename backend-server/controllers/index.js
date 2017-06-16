var path = require('path');

const index = function(req, res){
    // res.render("../../public/index");
    return res.sendFile(path.join(__dirname, '../../src/index.html'));
};

module.exports = index;

