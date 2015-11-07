- Written in [BabelScript](https://babeljs.io/).
- [React](http://facebook.github.io/react/), [Flux](https://facebook.github.io/flux/), [react-router](https://github.com/rackt/react-router), [immutable.js](http://facebook.github.io/immutable-js/).
- Dev stack based on [gulp.js](http://gulpjs.com/) and [webpack](http://webpack.github.io/) configured both for dev and production.
- Server side rendering.
- CSS livereload and webpack module hot reload.

## Prerequisites

Install [iojs](https://iojs.org/) or [node.js](http://nodejs.org).
Then install [gulp.js](http://gulpjs.com/).
```shell
  npm install -g gulp
```

For generating dataset schema images, there should be [graphviz](http://www.graphviz.org/) installed.

## Install

```shell
  git clone https://gitlab.fit.cvut.cz/ostrovac/dataset-repo.git
  cd dataset-repo
  npm install
```

## Run

- `gulp` start development
- `gulp -p` run app in production mode
- `gulp build -p` build in production mode

## Upload datasets
- Create a new database.
- Upload the data into the database. Make sure the tables are stored with InnoDB engine (not MyISAM, which doesn't support foreign key constrains). And if possible, prefer UTF-8 character set before latin1_swedish (the default value in old versions of MySQL).
- Add description of the data into meta.database (the unique property of the version of the dataset) and possibly into meta.dataset (the shared properties of the dataset versions).
- Execute the SQL script that updates meta.information.
- Validate the content of the webpage.

## Useful links for developers
- [React.js](http://facebook.github.io/react/). 
- [What is the Flux application architecture](https://medium.com/brigade-engineering/what-is-the-flux-application-architecture-b57ebca85b9e). 
- [Learn ES6](https://babeljs.io/docs/learn-es6/). 
- [Immutable.js](http://facebook.github.io/immutable-js/) and [the case for immutability](https://github.com/facebook/immutable-js/#the-case-for-immutability). 
- [Express.js](http://expressjs.com/) 
- [Node.js](http://nodejs.org/api/) 
- [Isomorphic javascript](http://isomorphic.net/javascript)