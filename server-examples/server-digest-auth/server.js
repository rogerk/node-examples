/*
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR(S) DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR(S) BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
 * OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
 * CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

const http = require("http");
const auth = require("http-auth");

const digestAuth = auth.digest({
    realm: "Private area",
    file: __dirname + "/htpasswd",
    authType: "digest"
});

digestAuth.on("success", (req, res) => {
    console.log(`User authenticated: ${req.user}`);
});

digestAuth.on("fail", (req, res) => {
    console.log(`User authentication failed: ${req.user}`);
});

digestAuth.on("error", (error, req) => {
    console.log(`Authentication error: ${error.code + " - " + error.message}`);
});

const server = http.createServer(digestAuth, (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write(`Welcome ${req.user}`);
    res.end();
});

server.listen(8100, "127.0.0.1");
console.log("Server is ready");
