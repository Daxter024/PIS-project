const data=require("./dal.js");

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
        console.log(obj);
        this.dal.findUser(obj,function(usr){
            if(!usr){
                model.dal.insertUser(obj, function(res){
                    console.log("insertado");
                    console.log(res);
                    callback(res);
                });
            }
            else{
                // user already exists
                callback({"email":-1});
            }
        });
    }

    this.loginUser=function(obj, callback){
        let model = this;
        console.log("obj ",obj);
        this.dal.findUser(obj,function(usr){
            // console.log(usr);
            // console.log(obj.email);
            if(usr){
                console.log("User: "+ usr.email + " logged");
                callback(usr);
            }
            else{
                console.log("User: "+ obj.email + " not found");
                // user not found
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