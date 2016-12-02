var express = require('express');
var User = require('../models/User');
var router = express.Router();

router.get('/', function(req, res) {
    if(req.query.q){
        var m = req.query.q;
        User.find( { $or:[ {'name': { $regex : m}}, {'surname': { $regex : m}} ]},function(err,users) {
            if (err) return res.status(500).json({error: err});
            res.json(users)
        });
    }
    else if(req.query.name){
        return User.find({'name': { $regex : req.query.name}},function(err,users) {
            if (err) return res.status(500).json({error: err});
            res.json(users)
        });
    }
    else if (req.query.surname){
        return User.find({'surname': { $regex : req.query.surname}},function(err,users) {
            if (err) return res.status(500).json({error: err});
            res.json(users)
        });
    }
    else if(req.query.age){
            return User.find({'age': req.query.age}, function (err, users) {
                if (err) return res.status(500).json({error: err});
                res.json(users)

        })}
    else{
       return res.json({message: "Non hai cercato nulla"});
    }
});

router.get('/maggiore', function(req, res){
    return User.find({ qty: { $gt: 21}}, function (err, users) {
        if (err) return res.status(500).json({error: err});
        res.json(users)

    })
})
router.get('/minore', function(req, res){
    return User.find({ qty: { $lt: req.query.age}}, function (err, users) {
        if (err) return res.status(500).json({error: err});
        res.json(users)

    })
})
module.exports = router;
