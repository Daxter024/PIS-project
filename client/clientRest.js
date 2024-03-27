function ClientRest(){
    this.addUser=function(nick){
        $.getJSON("/addUser/"+nick, function(data) {
            if(data.nick != -1){
                console.log("User: "+ data.nick + " created");
            }else{
                console.log("Existing user "+ nick);
            }
        }); 
    }

    this.getUsers = function(){
        $.getJSON("/getUsers", function(data) {
            traverse(data.users);
            function traverse(obj) {
                for (let key in obj) {
                  if (typeof obj[key] === 'object') {
                    console.log('Object:', key);
                    traverse(obj[key]);
                  } else {
                    console.log(key + ':', obj[key]);
                  }
                }
                console.log("------------")
              }
        });
    }

    this.activeUser = function(nick){
        $.getJSON("/activeUser/"+nick, function(data) {
            if(data.active){
                console.log("User: "+ nick + " is active");
            }else{
                console.log("User: "+ nick + " is not active");
            }
        });
    }

    this.numberUsers = function(){
        $.getJSON("/numberUsers", function(data) {
            console.log("Number of users: "+ data.num);
        });
    }

    this.deleteUser = function(nick){
        $.getJSON("/deleteUser/"+nick, function(data) {
            if(data.deleted){
                console.log("User: "+ nick + " deleted");
            }else{
                console.log("User: "+ nick + " not deleted");
            }
        });
    }
}