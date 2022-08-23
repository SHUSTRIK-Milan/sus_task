import CONFIG from '../../configs/server-config.js';
import grpc from '@grpc/grpc-js';

import PackageDefinition from '#lib/classes/package-definition.js'


const PackageDefinition = PackageDefinition()
const database_proto = PackageDefinition.database_proto

function main() {
    let client = new database_proto.Database(CONFIG.address, grpc.credentials.createInsecure());

    /* client.create({name: "hello"}, function(err, response) {
        console.log(response.message);
    }); */
    /* client.update({id: 1, name: "hello33"}, function(err, response) {
        console.log(response.message);
    }); */
    /* client.read({id: 1}, function(err, response) {
        console.log(response.message);
    }); */
    /* client.delete({id: 1}, function(err, response) {
        console.log(response.message);
    }); */
}

main();  