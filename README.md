# Build process for Angular App
This will install among others:

ncp     - cross platform copy (ncp [src] [dest])
rimraf  - cross platform delete (rimraf [dir|file])
mkdirp  - cross platform mkdir (mkdir -p [dir])
...


# How to run
You can edit your files, webpack will keep an eye on changes and refresh automatically as you save, so no need to reload the browser.

# install the dependencies
```
$ npm install
```

# DEV: start the server
```
$ npm start
```

go to [http://localhost:3000](http://localhost:3000) in your browser.

Continue working normally.
If you change your html, you might need to refresh manually, otherwise stop and run  'npm start' again.


# How to test
```
npm run test

```

# How to Build
This lints your files, tests and outputs a minified bundle of all your js/css
A precommit hook will stop the build if lint/test errors occur.
```
npm run build
```


