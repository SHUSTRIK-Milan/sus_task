import CONFIG from '../../configs/server-config.js';
import grpc from '@grpc/grpc-js';

import {PackageDefinition} from '#lib/classes/package-definition.js'
import {KnexManager} from '#server-lib/classes/knex-manager.js'
import {Database} from '#server-lib/classes/database.js'


const packageDefinition = new PackageDefinition()
const database_proto = packageDefinition.database_proto
const knexManager = new KnexManager(CONFIG.knex)
const database = new Database(knexManager)

function main() {
    var server = new grpc.Server();
    server.addService(database_proto.Database.service, {
        knexManager: knexManager,
        create: database.create,
        update: database.update,
        read:   database.read,
        delete: database.delete
    });
    server.bindAsync(CONFIG.address, grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    });
}

main();