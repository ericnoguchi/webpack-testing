steps to reproduce error.

- npm install
- npm start
- go to http://localhost:8080/ and observe error
- updated any of the scss modules e.g. common.scss and after webpack-dev-server refreshes error is gone.
- check async/*.chunk.js contents in each case injected in the head tag.


Update
issue fixed by adding
    'vendor': [
         "style-loader/lib/addStyles",
         "css-loader/lib/css-base",
     ],