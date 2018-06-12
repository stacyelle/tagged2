var express = require('express');
var router = express.Router();
var models = require('../models');


var user = models.user.findOne().then(function(user){
    console.log(user.username)
    return user.username;
})


/* GET home page. */
router.get('/', function(req, res, next) {
    models.user.findById(1,{
        include: [
            models.message
        ]
    })
    .then( user =>{
        models.tag.findById(1)
        .then(tag => {
            res.render('index', {
                title: 'tagged',
                user: user.username,
                //use handlebars to show all messages related to user
                message: user.messages[0].message,
                tag: tag.tagnum
            })
        })

    })
});

module.exports = router;
