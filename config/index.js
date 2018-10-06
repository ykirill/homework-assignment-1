/**
 * Create environment object, and export it.
 */

// Environments object.
const environments = {};

// Development.
environments.development = {
    port: 3000,
    envName: 'development'
};

// Production.
environments.production = {
    port: 8080,
    envName: 'production'
};

const curretEnv = typeof(process.env.NODE_ENV) === 'string' ?
    process.env.NODE_ENV : '';

const configuration = typeof(environments[curretEnv]) !== 'undefined' ?
    environments[curretEnv] : environments.development;

//Export configuration for current environment.
module.exports = configuration;

