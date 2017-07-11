steps to reproduce error.

- npm install
- npm run startDev
- go to http://localhost:8080/ and observe error
- updated any of the scss modules e.g. common.scss and after webpack-dev-server refreshes error is gone.
- check async/*.chunk.js contents in each case injected in the head tag.
