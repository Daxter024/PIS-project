const data=require("./dal.js");
const correo = require("./email.js");
const bcrypt = require('bcrypt');

function System(){
    this.users={};
    this.dal = new data.Dal();

    this.googleUser=function(usr,callback){
        this.dal.findOrCreateUser(usr, function(obj){
            callback(obj);
        });
    }

    this.registerUser=function(obj, callback){
        let model = this;
        if(!obj.nick){
            obj.nick = obj.email;
        }
        // console.log(obj);
        this.dal.findUser({"email": obj.email}, async function(usr){
            console.log("usr: ", usr);
            if(!usr){
                obj.key = Date.now().toString();
                obj.confirmed = false;
                const hash = await bcrypt.hash(obj.password, 10);
                // obj.password = bcrypt.hashSync(obj.password, 10);
                obj.password = hash;
                model.dal.insertUser(obj, function(res){
                    console.log("insertado");
                    // console.log(res);
                    callback(res);
                });
                correo.sendEmail(obj.email, obj.key, "Confirm your account");
            }
            else{
                // user already exists
                console.log("User: "+ obj.email + " already exists");
                callback({"email":-1, "msg": "User already exists"});
            }
        });
    }

    this.loginUser=function(obj, callback){
        let model = this;
        console.log("obj ",obj);
        this.dal.findUser({"email":obj.email, "confirmed":true},function(usr){
            // console.log(usr);
            // console.log(obj.email);
            if(usr){
                bcrypt.compare(obj.password, usr.password, function(err, result) {
                    if(result){
                        console.log("User: "+ usr.email + " logged");
                        callback(usr);
                    }
                    else{
                        console.log("password incorrect");
                        console.log("User: "+ obj.email + " not found");
                        // user not found
                        callback({"email":-1});
                    }
                })
            }else{
                console.log("User: "+ obj.email + " not found");
                // user not found
                callback({"email":-1});
            }
        });
    }

    this.verifyUser=function(obj, callback){
        let model = this;
        this.dal.findUser({"email":obj.email,"confirmed":false, "key":obj.key},function(usr){
            if(usr){
                usr.confirmed = true;
                model.dal.updateUser(usr, function(res){
                    callback({"email": res.email});
                });
            }else{
                callback({"email":-1});
            }
        });
    }
    
    this.addUser=function(nick){
        let res ={"nick":-1};
        if(this.users[nick]){
            console.log("Existing user "+ nick);
        }else{
            this.users[nick]= new User(nick);
            res.nick = nick;
        }
        return res;
    }

    this.getUsers = function(){
        let res ={"users": this.users};
        return res;
    }

    this.activeUser = function(nick){
        let res = {"active": false};
        if(this.users[nick]){
            res.active = true;
        }
        return res;
    }

    this.deleteUser = function(nick){
        let res = {"deleted": false};
        if(this.users[nick]){
            res.deleted = delete this.users[nick]; 
        }
        return res;
    }

    this.numberUsers = function(){
        let res = {"num": 0}
        res.num = Object.keys(this.users).length;
        return res;
    }

    this.dal.connect(function(db){
        console.log("Database connected");
    });
}

function User(nick){
    this.nick=nick;
}

module.exports.System = System;
module.exports.User = User;