import type { MigrationConfig } from "drizzle-orm/migrator";

process.loadEnvFile();


type DBConfig = {
    url: string;
    migrationConfig: MigrationConfig;
}
type APIConfig = {
    fileServerHits: number;
}

type Config = {
    api: APIConfig;
    db: DBConfig;
}

function envOrThrow(varName: string): string {
    const value = process.env[varName];
    if (!value) {
        throw new Error(`Environment variable ${varName} is not set`);
    }
    return value;
}

export const config: Config = {
    api: {
        fileServerHits: 0,
    },
    db: {
        url: envOrThrow("DB_URL"),
        migrationConfig: {
            migrationsFolder: "./src/db/migrations",
        },
    },
};