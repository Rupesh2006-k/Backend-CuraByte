const requiredEnv = [
    'PORT',
    'GOOGLE_GEMINI_KEY',
    'JWT_SECRET',
    'MONGO_URI',
    'IMAGEKIT_PUBLIC_KEY',
    'IMAGEKIT_PRIVATE_KEY',
    'IMAGEKIT_URL',
    'TWILIO_ACCOUNT_SID',
    'TWILIO_AUTH_TOKEN',
    'TWILIO_PHONE_NUMBER',
  ]
  
  requiredEnv.forEach((key) => {
    if (!process.env[key]) {
      console.error(`❌ Missing environment variable: ${key}`)
      process.exit(1) 
    }
  })
  
  module.exports = {
    PORT: process.env.PORT,
    GOOGLE_GEMINI_KEY : process.env.GOOGLE_GEMINI_KEY,
    JWT_SECRET : process.env.JWT_SECRET,
    MONGO_URI : process.env.MONGO_URI,
    IMAGEKIT_PUBLIC_KEY : process.env.IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_PRIVATE_KEY : process.env.IMAGEKIT_PRIVATE_KEY,
    IMAGEKIT_URL : process.env.IMAGEKIT_URL,
    TWILIO_ACCOUNT_SID : process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN : process.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER : process.env.TWILIO_PHONE_NUMBER,
  }


  /*
  
  PORT=3000
GOOGLE_GEMINI_KEY= add your google gemini key here
JWT_SECRET= add your jwt secret here
MONGO_URI= add your mongo uri here

IMAGEKIT_PUBLIC_KEY= add your imagekit public key here
IMAGEKIT_PRIVATE_KEY= add your imagekit private key here
IMAGEKIT_URL= add your imagekit url here

TWILIO_ACCOUNT_SID= add your twilio account sid here
TWILIO_AUTH_TOKEN= add your twilio auth token here
TWILIO_PHONE_NUMBER= add your twilio phone number here

  
  */