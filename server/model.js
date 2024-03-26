function System(){
    this.users={};
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
}

function User(nick){
    this.nick=nick;
}

module.exports.System = System;
module.exports.User = User;