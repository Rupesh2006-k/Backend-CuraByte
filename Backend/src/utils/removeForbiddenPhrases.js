const removeForbiddenPhrases = (text) => {
    if (!text) return "";
  
    const forbiddenPatterns = [
      /i'?m sorry/gi,
      /sorry/gi,
      /i am an ai/gi,
      /cannot provide medical advice/gi,
      /cannot provide medical diagnoses?/gi,
      /consult (a )?(doctor|healthcare professional)/gi,
      /important to/gi,
      /in the meantime/gi,
      /feel better/gi,
    ];
  
    let cleanText = text;
  
    forbiddenPatterns.forEach((pattern) => {
      cleanText = cleanText.replace(pattern, "");
    });
  
    return cleanText.replace(/\s+/g, " ").trim();
  };
  

  module.exports = removeForbiddenPhrases