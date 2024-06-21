// Define the components
function ControlWeb(){

    // function to clean all the page elements
    this.clean = function(){
        $("#welcomeMsg").empty();
        $("#addUser").empty();
        $("#login-container").empty();
    }

    this.checkSession = function(){
        let nick = localStorage.getItem("nick");
        if(nick){
            cw.welcomeModal(nick);
        }else{
            cw.showLogin();
        }
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

    this.showLogin = function(){
        let cadena = '';
        cadena += '<section class="bg-gray-50 dark:bg-gray-900">';
        cadena += '    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">';
        cadena += '        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">';
        cadena += '            <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">';
        cadena += '            Flowbite';
        cadena += '        </a>';
        cadena += '        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">';
        cadena += '            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">';
        cadena += '                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">';
        cadena += '                    Sign in to your account';
        cadena += '                </h1>';
        cadena += '                <form class="space-y-4 md:space-y-6" action="#">';
        cadena += '                    <div>';
        cadena += '                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>';
        cadena += '                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2563eb focus:border-2563eb block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-3b82f6 dark:focus:border-3b82f6" placeholder="name@company.com" required>';
        cadena += '                    </div>';
        cadena += '                    <div>';
        cadena += '                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>';
        cadena += '                        <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2563eb focus:border-2563eb block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-3b82f6 dark:focus:border-3b82f6" required>';
        cadena += '                    </div>';
        cadena += '                    <div class="flex items-center justify-between">';
        cadena += '                        <div class="flex items-start">';
        cadena += '                            <div class="flex items-center h-5">';
        cadena += '                                <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-2563eb dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-2563eb dark:ring-offset-gray-800" required>';
        cadena += '                            </div>';
        cadena += '                            <div class="ml-3 text-sm">';
        cadena += '                                <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>';
        cadena += '                            </div>';
        cadena += '                        </div>';
        cadena += '                        <a href="#" class="text-sm font-medium" style="color: #2563eb;">Forgot password?</a>';
        cadena += '                    </div>';
        cadena += '                    <button id="btnLogin" type="submit" class="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-4 focus:outline-none border" style="background-color: #2563eb; border-color: #3b82f6; hover:bg-1d4ed8; focus:ring-1d4ed8;">Sign in</button>';
        cadena += '                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">';
        cadena += '                        Don’t have an account yet? <a href="#" class="font-medium" style="color: #2563eb;" onclick="cw.showSignUp()">Sign up</a>';
        cadena += '                    </p>';
        cadena += '                </form>';
        cadena += '            </div>';
        cadena += '        </div>';
        cadena += '    </div>';
        cadena += '</section>';
        

        $("#login-container").append(cadena);

        $("#btnLogin").on("click",function(){
            // call rest
        });
    }

    this.showSignUp = function(){
        this.clean();
        let registerForm = '';
        registerForm += '<section class="bg-gray-50 dark:bg-gray-900">';
        registerForm += '    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">';
        registerForm += '        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">';
        registerForm += '            <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">';
        registerForm += '            Flowbite';
        registerForm += '        </a>';
        registerForm += '        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">';
        registerForm += '            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">';
        registerForm += '                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">';
        registerForm += '                    Create your account';
        registerForm += '                </h1>';
        registerForm += '                <form class="space-y-4 md:space-y-6" action="#">';
        registerForm += '                    <div>';
        registerForm += '                        <label for="nick" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nick</label>';
        registerForm += '                        <input type="text" name="nick" id="nick" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2563eb focus:border-2563eb block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-3b82f6 dark:focus:border-3b82f6" placeholder="Your nick" required>';
        registerForm += '                    </div>';
        registerForm += '                    <div>';
        registerForm += '                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>';
        registerForm += '                        <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2563eb focus:border-2563eb block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-3b82f6 dark:focus:border-3b82f6" placeholder="name@company.com" required>';
        registerForm += '                    </div>';
        registerForm += '                    <div>';
        registerForm += '                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>';
        registerForm += '                        <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2563eb focus:border-2563eb block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-3b82f6 dark:focus:border-3b82f6" required>';
        registerForm += '                    </div>';
        registerForm += '                    <button id="btnRegister" type="submit" class="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-4 focus:outline-none border" style="background-color: #2563eb; border-color: #3b82f6; hover:bg-1d4ed8; focus:ring-1d4ed8;">Register</button>';
        registerForm += '                </form>';
        registerForm += '            </div>';
        registerForm += '        </div>';
        registerForm += '    </div>';
        registerForm += '</section>';

        $("#register-container").append(registerForm);
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