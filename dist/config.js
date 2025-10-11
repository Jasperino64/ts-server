process.loadEnvFile();
function envOrThrow(varName) {
    const value = process.env[varName];
    if (!value) {
        throw new Error(`Environment variable ${varName} is not set`);
    }
    return value;
}
export const config = {
    api: {
        fileServerHits: 0,
        platform: envOrThrow("PLATFORM")
    },
    db: {
        url: envOrThrow("DB_URL"),
        migrationConfig: {
            migrationsFolder: "./src/db/migrations",
        },
    },
};
