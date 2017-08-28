const Client   = require('../models/client.model');
const crypto          = require('crypto');
const jwtConfg   = require('./jwt.config');
const jwt   = require('jsonwebtoken');


secureApiRoute = (req, res, next) => {
    let token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, jwtConfg.jwtSecret, (err, decode)=>{
            if(err){res.status(401).json({Error: "Invalid Token"});}
            else{
                next();
            }
        });
    }else{
        res.status(401).json({Error: "Provide Token"});
    }
}

clientRegistration = (req, res)=> {
    if(req.body.email){
        var client = new Client({
            email: req.body.email,
            password: req.body.password
        });
        client.save((err, user)=>{
            if(err){return res.json(err)}
            res.json({success: true, user_client: user._id});
        });
    }else{
        return res.status(500).json({Error: "Internal Server Error"});
    }
}

clientToken = (req, res, next)=> {
    if(req.body.email && req.body.password){

        Client.findOne({email: req.body.email}).then((client)=>{
            // console.log(client);
            let clint = client.comparePassword(req.body.password);
            if (clint){
                var token = jwt.sign({id: client._id}, jwtConfg.jwtSecret);
                res.json({token: token});
            }else{
                res.sendStatus(401);
            }

        },(err)=> console.error(err));
    }else{
        res.sendStatus(401);
    }

}
clients = (req, res)=>{
    // console.log(jwtConfg.jwtSession);
    Client.find({}).then((clients)=>{
        res.json(clients);
    },(err)=> res.json(err));
}

module.exports = {
    clientRegistration, clientToken, clients,
    secureApiRoute
}

