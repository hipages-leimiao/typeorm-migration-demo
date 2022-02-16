import { ConnectionOptions } from 'typeorm';

const getOptions = (env: string): ConnectionOptions => {
    const connectionOptions: ConnectionOptions = {
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: [
            'src/common/entity/*.ts',
        ],
        migrations: [
            'src/migration/*.ts',
        ],
        cli: {
            migrationsDir: 'src/migration'
        }
    };
    if (env === "production") {

    } else if (env === "development") {
        Object.assign(connectionOptions, {
            host: 'typeorm-demo-service.argocd.svc.cluster.local',//'0.0.0.0',
            port: 5432,
            username: 'payment',
            password: 'payment',
            database: 'payment',
        });
    }
    return connectionOptions;
};


export = getOptions(process.env.NODE_ENV || "development");
