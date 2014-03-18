var exec = require("child_process").exec;

function start(response) {
    console.log("Request handler 'start' was called.");
    var content = "empty";


    exec("ls -lah", // this could be any "blocking operation"
            // that is, an operation that takes a while
            // to return that would ordinarily stop the // server

        function(err, stdout, stderr){
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(stdout);
            response.end();
        });
}

function upload(response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("in upload");
    response.end();
}

exports.start = start;
exports.upload = upload;