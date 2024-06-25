// Define the components
function ControlWeb(){

    // function to clean all the page elements
    this.clean = function(){
        $("#welcomeMsg").empty();
        $("#addUser").empty();
        $("#login-container").empty();
        $("#register-container").empty();
        $("#homePage").empty();
        $("#dashboard-container").empty();
    }

    this.checkSession = function(){
        let nick = $.cookie("nick");
        if(nick){
            cw.showDashboard();
            cw.welcomeModal(nick);
        }else{
            cw.showLogin();
        }
    }

    this.showLogin = function(){

        $("#login-container").load("./client/login.html", function(){
            $("#btnLogin").on("click",function(){
                let email = $("#email").val();
                let password = $("#password").val();
                let cookie = $("#remember").is(":checked");
                if(email && password){
                    console.log(email, password, cookie);
                    rest.loginUser(email, password, cookie);
                }
            });
        });
    }

    this.showSignUp = function(){
        // 2 ways
        // 1. clean all empty()
        // 2. clean the showSignUp, need to have an id to remove it
        this.clean();

        $("#register-container").load("./client/register.html",function(){
            $("#btnRegister").on("click",function(){
                let nick = $("#nick").val();
                let email = $("#email").val();
                let password = $("#password").val();
                if(email && password){
                    console.log(nick);
                    rest.registerUser(email, password);
                }
            });
        });
    }

    this.showDashboard = function(){
        this.clean();
        $("#dashboard-container").load("./client/home.html",function(){
            $("#btnLogout").on("click",function(){
                cw.logOutModal();
            });
        });
    }

    this.welcomeModal = function(nick){
        let modal = '';
        modal += '<div id="welcomeModal" class="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900 bg-opacity-50">';
        modal += '  <div class="bg-white rounded-lg shadow-lg dark:bg-gray-800">';
        modal += '    <div class="p-6">';
        modal += '      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Bienvenido al sistema, ' + nick + '</h2>';
        modal += '      <p class="text-gray-700 dark:text-gray-300">Haz clic en el botón de abajo para continuar.</p>';
        modal += '      <div class="mt-6 flex justify-end">';
        modal += '        <button id="closeModalButton" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Cerrar</button>';
        modal += '      </div>';
        modal += '    </div>';
        modal += '  </div>';
        modal += '</div>';

        $("#welcomeMsg").append(modal);

        $("#closeModalButton").on("click",function(){
            //TODO every time i press F5 this modal ll be showing up, do something!! 
            $("#welcomeModal").remove();
        });
    }

    this.logOutModal = function(){
        var modal = '';
        modal += '<div id="logoutModal" class="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900 bg-opacity-50">';
        modal += '  <div class="bg-white rounded-lg shadow-lg dark:bg-gray-800">';
        modal += '    <div class="p-6">';
        modal += '      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Are you sure you want to logout?</h2>';
        modal += '      <div class="mt-6 flex justify-end space-x-4">';
        modal += '        <button id="cancelButton" class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">Cancel</button>';
        modal += '        <button id="confirmButton" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">Logout</button>';
        modal += '      </div>';
        modal += '    </div>';
        modal += '  </div>';
        modal += '</div>';

        $("#logout-modal").append(modal);

        $("#cancelButton").on("click",function(){
            $("#logoutModal").remove();
        });

        $("#confirmButton").on("click",function(){
            cw.closeSession();
        });
    }

    this.informativeModal = function(msg){
        var modal = '';
        modal += '<div id="informativeModal" class="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900 bg-opacity-50">';
        modal += '  <div class="bg-white rounded-lg shadow-lg dark:bg-gray-800">';
        modal += '    <div class="p-6">';
        modal += '      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">'+msg+'</h2>';
        modal += '      <div class="mt-6 flex justify-end">';
        modal += '        <button id="closeModalButton" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Close</button>';
        modal += '      </div>';
        modal += '    </div>';
        modal += '  </div>';
        modal += '</div>';

        $("#informative-modal").append(modal);

        $("#closeModalButton").on("click",function(){
            $("#informativeModal").remove();
        });
    }

    this.showHomePage = function(){
        this.clean();
        let homePage = '';
        homePage += '<div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">';
        homePage += '    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">';
        homePage += '        <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Bienvenido al sistema, <span id="nick"></span></h2>';
        homePage += '        <p class="mb-4 text-gray-700 dark:text-gray-300">¡Esperamos que disfrutes de tu experiencia!</p>';
        homePage += '        <button id="logoutButton" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Cerrar Sesión</button>';
        homePage += '    </div>';
        homePage += '</div>';

        $("#homePage").append(homePage);

        $("#logoutButton").on("click",function(){
            cw.closeSession();
        });
    }

    this.closeSession = function(){
        $.removeCookie("nick");
        location.reload();
        rest.closeSession();
    }

    this.showAddUser = function(){
        let cadena= '<div id="fau" class="form-group">';
        cadena += '<label for="nick">Nick</label>';
        cadena += '<input type="text" class="form-control" id="nick" aria-describedby="emailHelp" placeholder="Enter nick">';
        cadena += '</div>';
        cadena += '<button id="btnAU" type="submit" class="btn btn-primary" onclick="clientRest.addUser(document.getElementById(\'nick\').value)">Submit</button>';

        $("#addUser").append(cadena);

        $("#btnAU").on("click",function(){
            let nick = $("#nick").val();
            rest.addUser(nick);
            $("#fau").remove();
        });
    }
}