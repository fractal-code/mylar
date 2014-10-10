# Mylar
Mylar is a platform for building web applications that protect data confidentiality against attackers who fully compromise the servers. You can read more about Mylar here: http://css.csail.mit.edu/mylar/

## mylar:platform

### Installation
**Only supports Meteor 0.9.1 and later**

```console
meteor add mylar:platform
```

### Usage

1. Add a reference to your collection objects by name in the MylarCol dictionary<br>
```javascript
Rooms = new Mongo.Collection('rooms');
MylarCol['rooms'] = Rooms;
```
<br>
2. Initialise your collections with Mongo.Collection.intercept.init([collection])<br>
```javascript
Rooms = new Mongo.Collection('rooms');
Mongo.Collection.intercept.init(Rooms);
```
<br>
3. Annotate which fields are sensitive and should be encrypted. <br>
```javascript
// encrypt the field "message" in the collection "Messages"
// specify that the field 'roomprinc' will contain the principal
// specify the principal as being of type 'room'
// specify '_id' & 'foo' as auth fields, meaning they must be present
Messages._encrypted_fields({'message': {princ: 'roomprinc', 
                                           princtype: 'room', 
                                           auth: ['_id', 'foo']}});
```
<br>
4. Indicate desired access control. This is done in Mylar using principals, each principal corresponds to a public/private key pair and represents an application-level access control entity, such as a user, group, or shared document. Each user is automatically assigned a principal which can be accessed with Principal.user(), other principals are created using Principal.create. To give principals access to other principals you can use Principal.add_access (or remove_access to revoke access) and to find principals, use Principal.lookup or Principal.lookupUser. <br>
```javascript 
// create new principal of type 'room' and name 'work'
// set the current user as creator, giving them access to this principle
// log the created principal in the callback function 
Principal.create("room", 'work', Principal.user(), function(princ) {
	console.log("Created principal: " + princ);
});
// grant the user "john" to the principal 'foo'
Principal.lookupUser("john", function (princ) {
    Principal.add_access(princ, 'foo', function () {/* callback */});
});
// revoke the user john's access to the principal 'foo'
Principal.lookupUser("john", function (princ) {
    Principal.remove_access(princ, 'foo', function () {/* callback */});
});
// lookup principal of type 'room' & name 'work' that was created by 'john'
// log the principal in the callback function
Principal.lookup([new PrincAttr('room', "work")], "john", function (principle) {console.log(principle};);
``` 
<br>

### Examine

Check that specified fields are encrypted in the mongo database.

```console
meteor mongo
db.[collection].findOne()
```

For each field specified as being encrypted, you should **only** see a corrresponding field postfixed with "_enc" that contains the encrypted contents. You should also see the principal under the specified field.

### Search

To enable search in your app you should follow the instructions in the [mylar:search package](https://github.com/gliesesoftware/mylar-search)

### Active attacker
To enable protection against an active adversary, you should follow the instructions in the [mylar:active-attacker package](https://github.com/gliesesoftware/mylar-active-attacker)
