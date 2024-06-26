const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

async function getSecret(secretName) {
    const name = 'projects/89060433168/secrets/'+secretName+'/versions/latest';
    const version = await client.accessSecretVersion({
        name: name
    });
    const data = version.payload.data.toString("utf-8");
    return data;
}

module.exports.getOptions = async function(secretName,callback){
    switch (secretName) {
        case "EMAIL":
            let options ={
                user: "",
                pass: ""
            };
            let user = await getSecret("EMAIL");
            let pass = await getSecret("EMAIL_PASSWORD");
            options.user = user;
            options.pass = pass;
            callback(options);
            break;
        case "USER_ID":
            let client_id = await getSecret("CLIENT_ID");
            let client_secret = await getSecret("CLIENT_SECRET");
            let variables = {
                client_id: client_id,
                client_secret: client_secret
            }
            callback(variables);
            break;
        case "GITHUB":
            let github_id = await getSecret("GITHUB_ID_GITHUB");
            let github_secret = await getSecret("CLIENT_SECRET_GITHUB");
            let github = {
                client_id: github_id,
                client_secret: github_secret
            }
            callback(github);
            break;
        case "DATABASE":
            let database = await getSecret("DATABASE");
            let db = {
                database: database
            }
            callback(db);
            break;
        case "ONETAP":
            let onetap = await getSecret("CLIENT_ID_ONETAP");
            let onetap_secret = await getSecret("CLIENT_SECRET_ONETAP");
            let onetap_var = {
                client_id: onetap,
                client_secret: onetap_secret
            }
            callback(onetap_var);
            break;
        default:
            break;
    }
    
}