/**
 * @Author Kirill Yakushev.
 * @date 10/06/2018.
 */

// DEPENDENCIES.
const server = require('./server');
const config = require('./config');

// Run the server.
server.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}.`)
});