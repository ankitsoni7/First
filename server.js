const express = require('express');
const app=express();
var bcrypt = require('bcrypt');
const bodyParser=require('body-parser');
var file=require('fs');


const passport = require('passport');
const localStrategy= require('passport-local').Strategy;
const session=require('express-session');
const cookieParser=require('cookie-parser');
const userConfig=require('./userconfig.json');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({secret:"car is here"}));
app.use(passport.initialize());
app.use(passport.session());
app.post("/signup",function (req,res) {
    var bcryptsalt=bcrypt.genSaltSync(5);

file.appendFile('file.txt',JSON.stringify({username:req.body.username,
    password:bcrypt.hashSync(req.body.password,bcryptsalt)
}),function (err) {
    if(err){throw err}
    console.log("done");
});
res.send("dd");
});
app.use(express.static('public'));
app.post('/login',
    passport.authenticate('local', { successRedirect: '/success',
                                     failureRedirect: '/'
        }));



passport.use(new localStrategy(

    function(username,password,done) {
        let dd;
        file.readFile('file.txt', (err, data) => {
            if (err) throw err;
            dd = JSON.parse(data);
            console.log(dd);
            // return data;
            console.log(dd.password);
            console.log(password);
            let fdata = bcrypt.compareSync(password, dd.password);
            console.log(username);
            console.log(userConfig);
            if (!fdata) {
                return done(null, false, {message: "username is not valid"});
            }
            else{
                return done(null, userConfig, {message: "username is not valid"});

            }
        });
    }

));
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});
app.get('/',function (req,res) {
    res.send('Hello');
});
app.get('/success',function (req,res) {
    res.send("successful login");
});
app.listen(5000,function () {
    console.log("server is running");
});