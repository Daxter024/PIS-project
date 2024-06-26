const model = require('./model.js');

describe("System ...", function() {
    let system;

    beforeEach(function() {
        system = new model.System(true);
        user = 'user';
        user2 = 'user2';
        user3 = {
            "email": "xxfranxx068@gmail.com",
            "pasword": "123456"
        }
    });

    it('No users', function(){
        // let response = system.numberUsers();
        expect(system.numberUsers()).toEqual({num: 0});
    });

    // white-box tests
    // path testing

    it('Add a user', function(){
        expect(system.numberUsers()).toEqual({num: 0});
        expect(system.addUser(user)).toEqual({nick: user});
        expect(system.numberUsers()).toEqual({num: 1});
        expect(system.getUsers().users).toEqual({user: {nick: user}});
        expect(system.addUser(user)).toEqual({nick: -1});
    });

    it('Get users', function(){
        expect(system.numberUsers()).toEqual({num: 0});
        system.addUser(user);
        system.addUser(user2);
        expect(system.numberUsers()).toEqual({num: 2});
        expect(system.getUsers().users.user).toEqual({nick: user});
        expect(system.getUsers().users.user2).toEqual({nick: user2});
    });

    it('Is active user', function(){
        expect(system.numberUsers()).toEqual({num: 0});
        system.addUser(user);
        expect(system.activeUser(user)).toEqual({active: true});
        expect(system.activeUser(user2)).toEqual({active: false});
    });

    it('Delete user', function(){
        expect(system.numberUsers()).toEqual({num: 0});
        system.addUser(user);
        expect(system.numberUsers()).toEqual({num: 1});
        system.deleteUser(user);
        expect(system.numberUsers()).toEqual({num: 0});
    });

});