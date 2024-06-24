function ClientRest(){

    this.registerUser = function(email, password){
        $.ajax({
            type: "POST",
            url: "/registerUser",
            data: JSON.stringify({"email":email,"password":password}),
            success: function (data) {
                console.log("data: "+data);
                if(data.nick!=-1){
                    console.log("User: "+ data.nick + " registered");
                    localStorage.setItem("nick",data.nick);
                    cw.clean();
                    cw.showLogin();
                    cw.welcomeModal(data.nick);
                    // TODO modal to show "Now use ur credentials to login"
                    // $.cookie("nick", data.nick);
                }else{
                    console.log("User: "+ data.nick + " already exists");
                }
                // cw.clean();
                // cw.welcomeModal(data.nick);
            },
            error:function(xhr, textStatus, errorThrown){
                console.log("Status: "+textStatus);
                console.log("Error: "+errorThrown);
            },
            contentType: "application/json",
        });
    }
    this.loginUser = function(email, password, cookie){
        $.ajax({
            type: 'POST',
            url: "/loginUser",
            contentType: 'application/json',
            data: JSON.stringify({"email": email, "password": password}),
            success: function(data) {
                if(data.email != -1){
                    console.log("User: " + data.email + " logged");
                    cookie ? localStorage.setItem("nick",data.email) : console.log("no remember");
                    // data.remember ? $.cookie("nick", data.email) : "";
                    // localStorage.setItem("nick",data.nick);
                    cw.clean();
                    cw.showHomePage();
                    // $.cookie("nick", data.nick);
                }else{
                    console.log("User: " + data.email + " doesn't exist");
                }
            }
        });
    }

    this.addUser=function(nick){
        var cli = this;
        $.getJSON("/addUser/"+nick, function(data) {
            if(data.nick != -1){
                console.log("User: "+ data.nick + " created");
                localStorage.setItem("nick",nick);
                // used when remmeber me is checked
            }else{
                console.log("Existing user "+ nick);
            }
        }); 
    }

    this.getUsers = function(){
        var cli = this;
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
        var cli = this;
        $.getJSON("/activeUser/"+nick, function(data) {
            if(data.active){
                console.log("User: "+ nick + " is active");
            }else{
                console.log("User: "+ nick + " is not active");
            }
        });
    }

    this.numberUsers = function(){
        var cli = this;
        $.getJSON("/numberUsers", function(data) {
            console.log("Number of users: "+ data.num);
        });
    }

    this.deleteUser = function(nick){
        var cli = this;
        $.getJSON("/deleteUser/"+nick, function(data) {
            if(data.deleted){
                console.log("User: "+ nick + " deleted");
            }else{
                console.log("User: "+ nick + " not deleted");
            }
        });
    }
}