export default {
    db: {
        uri: 'mongodb+srv://user:test@cluster0-6wnxv.mongodb.net/test?retryWrites=true&w=majority'
        // Will need to privatize user and password
    },
    databaseOptions: {
        user     : 'user',
        protected : 'test',
        port     : '3000'           // Keeping for now
    },
    secret: 'fjidas0jfisan8e9fhn9a88n',
    openCage: {
        key: 'd8f1bb88bbfa4f7ca0f0484c90a11383' //finding lat and long of birthPlace not implemented right now
    },
    bingMap:{
        key: 'AnxfM8n3m1Zr6H0pXfmiTxP9NBD1Y0NwimpNzIO4zu7AMxqjRwUc4wIekGKtGLA0'//api key for getting timezones
    },
    mailchimp:{
        mailchimpInstance   : 'us19',
        listUniqueId        : 'de644ad1de',
        mailchimpApiKey     : '31d36951a5db54c9db20da653fb109b3-us19',
    },
    googleAPI:{
        key = 'AIzaSyCL07PegVvOkQbIG9iFHa5MkfpSaSvOrWY'
    }
};
