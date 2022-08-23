import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const PROTO_PATH = './database.proto';

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var database_proto = grpc.loadPackageDefinition(packageDefinition).database;

function main() {
    let target = 'localhost:50051';

    var client = new database_proto.Database(target,
        grpc.credentials.createInsecure());

    /* client.create({name: "hello"}, function(err, response) {
        console.log(response.message);
    }); */
    /* client.update({id: 3, name: "hello33"}, function(err, response) {
        console.log(response.message);
    }); */
    /* client.read({id: 3}, function(err, response) {
        console.log(response.message);
    }); */
    client.delete({id: 2}, function(err, response) {
        console.log(response.message);
    });
}

main();  