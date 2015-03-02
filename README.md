- Written in [BabelScript](https://babeljs.io/). It handles next generation JavaScripts with [React JSX](http://facebook.github.io/react/docs/jsx-in-depth.html) syntax spiced by [Flowtype](http://flowtype.org/) type [annotations](http://flowtype.org/docs/type-annotations.html#_) already.
- [React](http://facebook.github.io/react/), [Flux](https://facebook.github.io/flux/), [react-router](https://github.com/rackt/react-router), [immutable.js](http://facebook.github.io/immutable-js/).
- Isomorphic architecture with state-less stores, server rendering, and routing inside expressjs.
- Global immutable app state like Om with cursors, so app state can be snapshotted and reloaded. Undo redo is super easy.
- The state of art performance thanks to [immutable.js](http://facebook.github.io/immutable-js) and [PureRenderMixin](http://facebook.github.io/react/docs/pure-render-mixin.html) combo.
- Well tuned dev stack based on [gulp.js](http://gulpjs.com/) and [webpack](http://webpack.github.io/) configured both for dev and production.
- CSS livereload and webpack module hot reload, so you can tweak React in real time.
- Isomorphic 404 and 500 pages.

## Install

```
  npm install --global gulp
  git clone https://gitlab.fit.cvut.cz/ostrovac/dataset-repo.git
  cd dataset-repo
  npm install
```

## Run

- `gulp` start development
- `gulp -p` run app in production mode
- `gulp build -p` build in production mode for continuous integration (CI)
