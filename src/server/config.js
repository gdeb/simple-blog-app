import commander from 'commander';

commander
    .option('--port <p>', 'Port used by the server', parseInt)
    .option('--config <path>', 'path to package.json', 'none')
    .option('--env <env>', 'environment: env or prod')
    .parse(process.argv);

const config = require(commander.config).config;

export const ENV = commander.env === 'dev' ? 'dev' : 'prod';
export const PORT = commander.port || config.port || 3000;
export const STATIC_DIR = config.build_folder + `/${ENV}/static`;
export const TEMPLATES_DIR = config.resource_folder + 'templates/';
