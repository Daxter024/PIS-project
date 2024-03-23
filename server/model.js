function System(){
    this.users={};
    this.addUser=function(nick){
        if(this.activeUser(nick)){
            return 'Existing user '+ nick;
        }
        this.users[nick]= new User(nick);
        return 'User: '+ nick + ' created';
    }

    this.getUsers = function(){
        return this.users;
    }

    this.activeUser = function(nick){
        if(this.users[nick]){
            return true;
        }
        return false;
    }

    this.deleteUser = function(nick){
        delete this.users[nick];
    }

    this.numberUsers = function(){
        return Object.keys(this.users).length;
    }
}

function User(nick){
    this.nick=nick;
}

module.exports.System = System;
module.exports.User = User;