module.exports = {
    mongoDbUrl : 'mongodb://localhost:27017/profiler',
    PORT:process.env.PORT || 3000,
    sessionSecrete: 'passportSECRETE090',
    dbConfig: {
        host: 'localhost',
    user: 'root',
    password: '',
    database: 'profiler',
    }

}