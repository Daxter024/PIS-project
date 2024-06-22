
//data accesss layer
const mongo = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
function Dal() {
    this.users;
    console.log(this.users);


    this.findOrCreateUser = function(usr, callback){
        findOrCreate(this.users,usr,callback);
    }
    function findOrCreate(collection,criterio,callback)
    {
        collection.findOneAndUpdate(criterio, {$set: criterio}, {upsert: true,returnDocument:"after",projection:{email:1}}, function(err,doc) {
           if (err) { throw err; }
           else { 
                console.log("Elemento actualizado via Google con correo: "+doc.value.email); 
                callback({email:doc.value.email});
            }
         });  
    }

    
    this.connect = async function(callback){
        let dal = this;
        let client = new mongo("mongodb+srv://"+process.env.DATABASE+".mongodb.net/?retryWrites=true&w=majority");
        await client.connect();
        const database = client.db("sistema");
        dal.users=database.collection("usuarios");
        callback(database);
    }
}

module.exports.Dal = Dal