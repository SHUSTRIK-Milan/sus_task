import CONFIG from '../../configs/server-config.js';
import grpc from '@grpc/grpc-js';

import {PackageDefinition} from '#lib/classes/package-definition.js'


const packageDefinition = new PackageDefinition()
const database_proto = packageDefinition.database_proto

async function main() {
    let client = new database_proto.Database(CONFIG.address, grpc.credentials.createInsecure());

    /* await client.create({name: "hello"}, function(err, response) {
        console.log(response.message);
    }); */
    /* await client.update({id: 1, name: "hello33"}, function(err, response) {
        console.log(response.message);
    }); */
    await client.read({id: 5}, function(err, response) {
        console.log(response.message);
    });
    /* await client.delete({id: 1}, function(err, response) {
        console.log(response.message);
    }); */
}

main();  