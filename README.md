# Mylar
Mylar is a platform that is unique in it's ability to offer web applications security & data confidentiality even in situations where servers are fully compromised. Mylar stores sensitive data in an encrypted format on the server and only decrypts the data in the user's browser. The concept of storing encrypted data on the server isn't new - but has always presented the obvious challenge of preventing the server from easily manipulating the data. Homomorphic encryption and functional encryption present theoretical techniques for manipulating encrypted data but are currently impractical for real-world implementation. Mylar provides a clever system for building web applications on top of encrypted data with reasonable performance overheads & minimal extra-development cost.

You can read more about Mylar here: http://css.csail.mit.edu/mylar/

## mylar:platform

The mylar:platform package allows you to easily utilise Mylar in your web applications. This project is still very young, so expect further documentation and augmentations to come in the near future.

### Installation
**Only supports Meteor 1.0 and later**

```console
meteor add mylar:platform
```

### Usage<br>
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
// specify 'time', '_id' & 'message' as authentication set fields - meaning their values must be consistent with one another
Messages._encrypted_fields({'message': {princ: 'roomprinc', 
                                           princtype: 'room', 
                                           auth: ['timestamp', '_id', 'message']}});
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
// grant the user "john" access to the principal 'foo'
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

For each field specified as being encrypted, you should **only** see a corresponding field postfixed with "_enc" that contains the encrypted contents. 

### Example

See the [mylar-encchat repo](https://github.com/gliesesoftware/mylar-encchat) for an example of using mylar to secure a simple chat application. 

### Search

To enable search in your app you should follow the instructions in the [mylar:search repo](https://github.com/gliesesoftware/mylar-search)

### Active attacker
To enable protection against an active adversary, you should follow the instructions in the [mylar:active-attacker repo](https://github.com/gliesesoftware/mylar-active-attacker)

## Publications

Raluca Ada Popa, Emily Stark, Jonas Helfer, Steven Valdez, Nickolai Zeldovich, M. Frans Kaashoek, and Hari Balakrishnan.
Building web applications on top of encrypted data using Mylar.
To appear in NSDI'14 (11th USENIX Symposium on Networked Systems Design and Implementation).

Raluca Ada Popa and Nickolai Zeldovich.
Multi-Key Searchable Encryption. 
Cryptology ePrint Archive, 2013/508.
(Mylar uses this new encryption scheme to perform search over data encrypted with different keys efficiently.)