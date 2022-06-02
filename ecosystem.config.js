module.exports = {
    apps : [{
      name   : "fkub_testing",
      script : "./src/bin/www",
      env:{
        "NODE_ENV": "heroku" 
      }
    }]
  }
  