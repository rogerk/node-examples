# Simple Server JSON

A simple Node server that serves JSON.

## Under The Hood

First we'll include the necessary Node.js modules:

-   The [File System (fs)](https://nodejs.org/api/fs.html) module will be used to access the JSON file for the response.
-   The [HTTP (http)](https://nodejs.org/api/http.html) module will be used to create the HTTP server.

```js
13. const fs = require("fs");
14. const http = require("http");
```

Next, we'll create the HTTP server and specify the processing when an HTTP request is received:

-   Create the HTTP server using the [createServer](https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener) api, specifying the incoming request and the outgoing response.
-   Set the proper JSON content type for the response.
-   Access the JSON file that will be sent for the response.
-   Send the response.

```js
16. const server = http.createServer((req, res) => {
17.     res.writeHead(200, { "Content-Type": "application/json" });
18.     const JSON = fs.readFileSync(`${__dirname}/index.json`);
19.     res.end(JSON);
20. });
```

Finally, we'll start the HTTP server listening on localhost port 8100 for incoming requests, and print a message to the console:

```js
22. server.listen(8100, "127.0.0.1");
23. console.log("Server is ready");
```

## Running The Sample

-   npm start
-   Visit: http://127.0.0.1:8100
