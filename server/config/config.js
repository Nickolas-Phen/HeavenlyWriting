export default {
    db: {
        uri: 'mongodb+srv://user:test@cluster0-6wnxv.mongodb.net/test?retryWrites=true&w=majority'
        // Will need to privatize user and password
    },
    databaseOptions: {
        user     : 'user',
        protected : 'test',
        port     : '8000'           // Keeping for now
    },
    secret: 'fjidas0jfisan8e9fhn9a88n',
    openCage: {
        key: 'd8f1bb88bbfa4f7ca0f0484c90a11383' //finding lat and long of birthPlace not implemented right now
    },
};