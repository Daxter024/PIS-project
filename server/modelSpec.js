const model = require('./model.js');

describe("System ...", function() {
    let system;

    beforeEach(function() {
        system = new model.System();
        user = 'test-user';
        user2 = 'test-user2';
    });

    it('No users', function(){
        expect(system.numberUsers()).toEqual(0);
    });

    it('Add a user', function(){
        expect(system.numberUsers()).toEqual(0);
        expect(system.addUser(user)).toEqual('User: '+ user + ' created');
        expect(system.numberUsers()).toEqual(1);
        expect(system.getUsers()[user]).toBeDefined();
        expect(system.getUsers()[user].nick).toEqual(user);
        expect(system.addUser(user)).toEqual('Existing user '+ user);
    });

    it('Get users', function(){
        expect(system.numberUsers()).toEqual(0);
        system.addUser(user);
        system.addUser(user2);
        expect(system.numberUsers()).toEqual(2);
        expect(system.getUsers()[user].nick).toEqual(user);
        expect(system.getUsers()[user2].nick).toEqual(user2);
    });

    it('Is active user', function(){
        expect(system.numberUsers()).toEqual(0);
        system.addUser(user);
        expect(system.activeUser(user)).toEqual(true);
        expect(system.activeUser(user2)).toEqual(false);
    });

    it('Delete user', function(){
        expect(system.numberUsers()).toEqual(0);
        system.addUser(user);
        expect(system.numberUsers()).toEqual(1);
        system.deleteUser(user);
        expect(system.numberUsers()).toEqual(0);
    });

});