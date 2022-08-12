const { Client } = require('pg')

const conn = new Client({
    user: 'idgangdirmhmxw',
    host: 'ec2-44-193-178-122.compute-1.amazonaws.com',
    database: 'd88a9b8b0ujok5',
    password: 'c9866fa3ea2d6b420fa622395d10b16be41e19ff52c918b0dcb56b46847aa201',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});
conn.connect()

module.exports = conn