import {Model} from 'objection';
import Knex from 'knex';
import SECRET from './secret.js';
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

const knex = Knex({
    client: 'pg',
    version: '7.2',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: SECRET.password,
        database: 'sus_database'
    }
});

Model.knex(knex);

class Server extends Model {
    static get tableName() {
        return 'servers';
    }
}

async function createSchema() {
    if(await knex.schema.hasTable('servers')) {
        return;
    }

    await knex.schema.createTable('servers', table => {
        table.increments('id').primary();
        table.string('name');
    });
}

async function db_create(call, callback) {
    await createSchema()
    let graph = await Server.query().insertGraph({
        name: call.request.name ?? "unnamed"
    });
    
    callback(null, {message: `The create operation ${graph.id}[id] was successful`});
}
async function db_update(call, callback) {
    await createSchema()
    try{
        await Server.query().upsertGraph({
            id: call.request.id,
            name: call.request.name ?? "unnamed"
        });
        callback(null, {message: `The update operation on ${call.request.id}[id] was successful`});
    }catch(err){
        callback(null, {message: `The update operation on ${call.request.id}[id] failed`});
    }
}
async function db_read(call, callback) {
    await createSchema()
    try{
        let data = await Server.query().findById(call.request.id);
        callback(null, {message: `The read operation on ${call.request.id}[id] was successful. Output:\n>>\t${data.name}`});
    }catch(err){
        callback(null, {message: `The read operation on ${call.request.id}[id] failed`});
    }
}
async function db_delete(call, callback) {
    await createSchema()
    try{
        await Server.query().deleteById(call.request.id);
        callback(null, {message: `The delete operation on ${call.request.id}[id] was successful.`});
    }catch(err){
        callback(null, {message: `The delete operation on ${call.request.id}[id] failed`});
    }
}

function main_server() {
    var server = new grpc.Server();
    server.addService(database_proto.Database.service, {
        create: db_create,
        update: db_update,
        read: db_read,
        delete: db_delete
    });
    server.bindAsync('localhost:50051', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
    });
}

main_server();