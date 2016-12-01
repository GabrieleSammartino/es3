var express = require('express');
var User = require('../models/User');
var router = express.Router();
//middleware
var middle =(function(req,res,next) {
  if (req.query.x && req.query.x === "pippo") {
    next();
  }
  else {
    res.status(401).json({message: "Utente non autorizzato"});
  }
});
router.get('/',function(req, res) {
  User.find({}, function(err,users){
    if(err) return res.status(500).json({error: err});
    res.json(users);
  });
});
router.get('/:id', function(req, res) {
  User.find({_id:req.params.id}, function(err,users)
  {
    if(err) return res.status(500).json({message: 'Utente non trovato'});
    res.json(users);
  });
});
router.post('/',middle, function (req, res, next) {
  var newUser = User(req.body);
  newUser.save(function(err){
    res.status(201).json(newUser);
  })
});
router.put('/:id',middle,function(req,res,next){
  if (req.params.id == 'all'){
      var conditions = {}, update =( {name : req.body.name},{surname : req.body.surname}/*,{age: req.body.age}*/), options = { multi: true };
      return User.update(conditions, update, options, callback);
      function callback (err, numAffected) {
        res.json({message : "Tutto ok"})
      }
  }
  else{
  User.findOne({_id: req.params.id}).exec(function(err, user){
    if(err) return res.status(500).json({message: 'Utente non trovato'});
    if(!user) return res.status(404).json({message: 'Utente non trovato'});
    for(key in req.body) {
      user[key] = req.body[key];
    }
    user.save(function(err){
      if(err) return res.status(500).json({message: 'Non riesco a salvare'});
      res.json(user);
    })
  })}
});
router.delete('/:id', function (req, res, next) {
  User.remove({_id: req.params.id}, function(err){
    if(err) return response.status(500).json({message:'Utente non trovato'});
    res.json({message : 'Utente eliminato correttamente'})
  })
});
router.delete('/', function (req, res) {
  if (req.query.x == '_All' || req.query.x == '_all') {
    User.remove({}, function(err) {
          if (err) {
            res.json({message : 'Errore'})
          } else {
            res.json({message : 'Utenti eliminati correttamente'})}
        });
  };

});



module.exports = router;

/* if(req.params.id == 'editall'){
 User.find({}).exec(function(err, user){
 if(err) return res.status(500).json({message: 'Utenti non trovati'});
 if(!user) return res.status(404).json({message: 'Utenti non trovati'});
 for(key in req.body) {
 user[key] = req.body[key];
 }
 user.save(function(err){
 if(err) return res.status(500).json({message: 'Non riesco a salvare'});
 res.json(user);
 })
 })}
 else{*/