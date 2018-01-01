# SailsStarter

a [Sails](http://sailsjs.org) application

### setup
- setup your database in ```config/connections.js```, for example;
```javascript
  starterMysqlServer: {
    adapter: 'sails-mysql',
    host: '127.0.0.1',
    user: 'root', //optional
    password: '', //optional
    database: 'sailstarter' //optional
  }
```

- goto ```config/models.js``` and enabled it;
```javascript
  connection: 'starterMysqlServer',
  ...
  migrate: 'alter'
```

- create ```isAuthorized.js``` in ```app/policies```, example [isAuthorized.js](https://github.com/isfaaghyth/Sails-Starter/blob/master/api/policies/isAuthorized.js)

- don't forget to create ```jwToken.js``` in ```app/services```, example [jwToken.js](https://github.com/isfaaghyth/Sails-Starter/blob/master/api/services/jwToken.js)

### let's started!

- Users model, like [this](https://github.com/isfaaghyth/Sails-Starter/blob/master/api/models/Users.js)
- and, UsersController, like [this](https://github.com/isfaaghyth/Sails-Starter/blob/master/api/controllers/UsersController.js)
- risk! don't miss it! add this policies in ```config/policies.js```:
```javascript
   'UsersController': {
      '*': 'isAuthorized',
      'create': true, // We dont need authorization here, allowing public access
      'login': true // We dont need authorization here, allowing public access
   },
```
- and finally, add this routes in ```config/routes.js```:
```javascript

   'POST /users/login': {
      controller: 'UsersController',
      action: 'login'
   },

   'POST /users/register': {
      controller: 'UsersController',
      action: 'create'
   }
```

### test!

```
POST http://baseurl:port/users/login
POST http://baseurl:port/users/register
```
