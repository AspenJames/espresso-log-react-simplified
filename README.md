# Espresso.Log

This is a web application for coffee shops to store and track their espresso recipe data. It consists of a Rails API server and a React/Redux frontend client.

## Dependencies 

* Ruby Version 2.3.7
* Node.js >= 8.10
* Ruby gem dependencies found in `Gemfile`
  - `pg` - PostgreSQL database adapter
  - `bcrypt` - secure password storage 
  - `foreman` - simplifying development servers
* Node package dependencies found in `client/package.json`
  - `react` & `redux`
  - `react-router`
  - `redux-thunk`
  - `CanvasJS` - located in `client/src/lib` 

## The Code

* Code for the API server can be found in `app/` following Rails convention
  - The controllers and routes are namespaced under `/api/v1/` for simple version control
  - `Active Model Serializer` is used for formatting JSON server responses, and those files can be found under `app/serializers`
* Code for the client can be found in `client/` following `create-react-app` convention
  - Components are located in `client/src/components` and `client/src/containers`
  - `CanvasJS` library used for creating graphs is located in `client/src/lib`
  - Redux store reducers and actions can be found in `client/src/reducers` and `client/src/actions`, respectively 
  - Some custom middleware for restoring a user's session upon page reload can be found in `client/src/middleware`

## Testing 

This project does not yet have any tests. I have plans to add unit testing to my Ruby models and front-end tests for my front-end client, at which point this section will be updated. 

## Setting Up Locally 

To spin up a local version of this project, first fork and clone thsi repo. Use the following commands to install dependencies and set up the database: 
```bash
$ cd espresso-log-react-simplified/
$ bundle install
$ rake db:create && rake db:migrate
$ cd client/
$ npm install
```

There is some seed data located in `db/seeds.rb`. This will add an account and some data to play around with. If you'd like to use this, execute `rake db:seed`. The account created has the following credentials: 
- Username: code@cafe.com
- Password: 'password'

Once your database is set up and all dependencies are installed, you may use `rake start` to start the API and client servers simultaneously. For separate server logging and easier debugging, you may start the servers in separate terminal windows or tabs (from within the top-level directory) with: 
```bash
*API Server*
$ bundle exec rails s -p 3001

*Client Server*
$ cd client/
$ npm start
```

Please note that the client server will start on port 3000 and depends upon the API server running on port 3001. If you would like to use different ports, update the proxy setting in `client/package.json` line 5 to reflect the port on which the API server is running. 

## Licence 

This program is licenced under the GPL V3 licence, a copy of which can be reviewed in the `LICENSE.md` file. 

        Copyright (C) 2018 Aspen James

        This program is free software: you can redistribute it and/or modify
        it under the terms of the GNU General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version.

        This program is distributed in the hope that it will be useful,
        but WITHOUT ANY WARRANTY; without even the implied warranty of
        MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
        GNU General Public License for more details.

        You should have received a copy of the GNU General Public License
        along with this program.  If not, see <https://www.gnu.org/licenses/>.

## Contributing 

Contributions are welcome and encouraged. All contributors are expected to follow the Code of Conduct outlined in `CONTRIBUTING.md` 
You may make a contribution by [raising an issue](https://github.com/AspenJames/espresso-log-react-simplified/issues) or submitting a pull request. 