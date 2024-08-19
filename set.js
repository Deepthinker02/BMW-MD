const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0JjY2RnWVpBaWM3WUVYSTJoK2p0ZDV6L2Z0dkhhTmhzWHZrS05hb0hVST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVDNhY2F5QnMwd2lXaU9CbitJc1doTGZrWEs3ZWRQczNuZGVKczVCRDRsYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2SEoxVUdCYXMxVjgyNVVmWjd6NE5aNzM3MTNid1pZejIxTWlwODE0Nm40PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaNUZKVzBCaW5ZZmN1RlQ1cnVobEJZaFQwVEtRYXZScGswRGhpbDFCcXdvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdNTkdXSm5CczVpY1Job2owZlFRVFByVWx0N01XSjhOLzB5cUxIMmg0SFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1DeEVxdXNUZlJpN2ExUC9ZQURUQlliSW1CZG9rUWlJNUpwQTlTZjNrMjQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUtYY2huQ2h5d1Z6VjJVWnhIMDVtZTdnNGt1K3ZmVW14UVBxTHRBbUpWRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaHhqY0RHbStFSUFIdWRXUEMxbWVoYnl5bjBIaW1kMEFSRUJXNGNrRXZqcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxML2tQOUJSRUlLcFZFd0VxUU5pQ0N2MUpOVjVnRGNPajNrZUhNUWw5a0NYYzQ5WEE1MDg1bUNtbk8wYitmbEE4eC9iUW5CQ3VOYlk1UFRKUmJlbUJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTMwLCJhZHZTZWNyZXRLZXkiOiJ1U05RSHFlOE1QbEF1YnRaY0o3UmlNWnppK3lzWmtYclRGN2hnb3lBWGVvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJHamd1WUZCS1MyeUxHQU8zaW83Q3lnIiwicGhvbmVJZCI6ImZhOTViMDA5LWIyMTktNGUzOS1iMDkzLTliZDFiNDRjNmVjMCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXQWZYVWVqWUFsRmljaWlVOFRudExMWDhOR0k9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUkFQWVFySXc0QXdWVVMyckRVQlZrNFhVR3NZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik1DVzFCTlNZIiwibWUiOnsiaWQiOiI5MjM0Mzk1OTc5Mzg6NzhAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0ppWDVjY0NFTldBamJZR0dBY2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkUxb3M3dzUrenFtMGVsRjE3YTk1T3BFa2N4YTY0SFd3NVAzQitWZEdSam89IiwiYWNjb3VudFNpZ25hdHVyZSI6IlMyMk40QTFpQ2d0ODlvRXMvT1Jienl0SFM0RFovbTNkN1FmempVSEcxZXFKcW43b1VkTGpYRlBZVEgyUXo5ZTc2NVF1SFJId0I2anVhREtmdDZWZURRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJEdHk3NjdQSVlPSnBnZFZ4STA2ZzlPTzAvV3M4VWIzZzlrWTNaUWQxUFhUTTBnQVhRWnBTcC8wYnZtckJDSC80NENPVzNPdXgrcE54VWx4cXJGc0hDUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzQzOTU5NzkzODo3OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJSTmFMTzhPZnM2cHRIcFJkZTJ2ZVRxUkpITVd1dUIxc09UOXdmbFhSa1k2In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI0MDcyMDMzLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQVB1YiJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "AWAIS IQBAL",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0f089184835ed3d3b1f8c.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
