//data accesss layer
const mongo = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const varmg = require("./varManagement.js");

function Dal() {
    this.users;

    this.findOrCreateUser = function(usr, callback){
        findOrCreate(this.users,usr,callback);
    }

    this.findUser = function(usr, callback){
        find(this.users, usr, callback);
    }

    this.insertUser = function(usr, callback){
        insert(this.users, usr, callback);
    }

    this.updateUser = function(usr, callback){
        update(this.users, usr, callback);
    }

    this.deleteAccount = function(usr, callback){
        deleteAcc(this.users, usr, callback);
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
    
    function find(collection, condition, callback){
        console.log("condition: ", condition);
        // console.log("collection: ", collection);
        collection.find(condition).toArray(function(err, usrs){
            if(usrs.length==0){
                callback(undefined);
            }else{
                console.log("user: ", usrs[0]);
                callback(usrs[0]);
            }
        });
    }

    function insert(collection, element, callback){
        collection.insertOne(element, function(err, res){
            if(err){
                console.log(err);
                // callback(undefined);
            }else{
                console.log("element: ", element);
                callback(element);
            }
        })
    }

    function update(collection, element, callback){
        collection.findOneAndUpdate({_id:ObjectId(element._id)}, {$set: element}, {upsert: false, returnDocument:"after", projection:{email:1}},
        function(err, res){
            if(err){throw err;}
            else{
                console.log("Element updated");
                callback({email:res.value.email});
            }
        });
    }

    function deleteAcc(collection, usr, callback){
        collection.deleteOne(usr, function(err){
            if(err){throw err;}
            else{
                console.log("Element deleted");
                callback({deleted:true});
            } 
        });
    }
    
    this.connect = async function(callback){
        let dal = this;
        let database_secret;
        varmg.getOptions("DATABASE", function(res){
            console.log("Database: "+res);
            database_secret = res.database;
        });
        let client = new mongo("mongodb+srv://"+database_secret+".mongodb.net/?retryWrites=true&w=majority");
        await client.connect();
        const database = client.db("sistema");
        dal.users=database.collection("usuarios");
        callback(database);
    }
}

module.exports.Dal = Dal