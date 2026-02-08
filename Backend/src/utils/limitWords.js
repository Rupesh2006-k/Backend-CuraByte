const limitWords = (text, maxWords = 50) => {
    if (!text) return "";
  
    const words = text
      .replace(/\n+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ");
  
    return words.slice(0, maxWords).join(" ");
  };
  module.exports = limitWords