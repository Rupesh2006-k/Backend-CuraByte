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