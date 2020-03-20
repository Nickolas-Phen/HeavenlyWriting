export default {
    db: {
      uri: 'mongodb+srv://administrator:heavenlywr1t1ng@usersdatabase-f3y79.mongodb.net/test?retryWrites=true&w=majority'
      // Will need to privatize user database password
    },
    databaseOptions: {
        user     : 'administrator',
        protected : 'heavenlywr1t1ng',
        port     : '3000'           // Keeping for now
    } 
  };