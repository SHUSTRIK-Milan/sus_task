import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

export class PackageDefinition {
    packageDefinition = protoLoader.loadSync(
        "src/protos/database.proto",
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
    database_proto = grpc.loadPackageDefinition(this.packageDefinition).database;
}