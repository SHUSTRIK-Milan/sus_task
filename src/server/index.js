import CONFIG from '../../configs/server-config.js';
import grpc from '@grpc/grpc-js';

import PackageDefinition from '#lib/classes/package-definition.js'
import KnexManager from '#server-lib/classes/knex-manager.js'
import Database from '#server-lib/classes/database.js'


const PackageDefinition = PackageDefinition()
const database_proto = PackageDefinition.database_proto
const KnexManager = KnexManager(CONFIG.knex)
const Database = Database(KnexManager)

function main() {
    var server = new grpc.Server();
    server.addService(database_proto.Database.service, {
        create: Database.create,
        update: Database.update,
        read:   Database.read,
        delete: Database.delete
    });
    server.bindAsync(CONFIG.address, grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    });
}

main();