require('dotenv').config()

const fs = require('fs');
const rfs = require('rotating-file-stream');

const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');
//check if production logs already exist and create if libraray did not exist
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval: '1d',
    path: logDirectory
});

const development = {
    path: 'development',
    //creating key 
    assets_path: './assets',
    session_cookies_key:'blahsomething',
    db:'codeial_development',
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user:'krneeraj1997@gmail.com',
            pass:'Nksmart1997@9910884306'
        },
    },
    google_client_ID: "313233209747-dnqmail3j800a2jvsuckqhohodhs7i63.apps.googleusercontent.com",
    google_client_Secret: "0FXb5EBWa4xRfJ8jR-1HKMd2",
    google_callback_URL: "http://localhost:8000/users/auth/google/callback",
    jwt_secret:'codeial',
    morgan:{
        mode:'dev',
        option: {stream: accessLogStream}
    }
    

}

const production = {
    path: 'production',
    assets_path: process.env.CODEIAL_ASSET_PATH,
    session_cookies_key:process.env.CODEIAL_SESSION_COOKIE_KEY,
    db:process.env.CODEIAL_DB,
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user:process.env.CODEIAL_GMAIL_USERNAME,
            pass:process.env.CODEIAL_GMAIL_PASSWORD
        },
    },
    google_client_ID: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_Secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_callback_URL: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret:process.env.CODEIAL_JWT_SECRET,
    morgan:{
        mode:'combined',
        option: {stream: accessLogStream}
    }
}
 module.exports = eval(process.env.CODEIAL_ENVIRONMENT)== undefined ? development: eval(process.env.CODEIAL_ENVIRONMENT);

//module.exports = production;