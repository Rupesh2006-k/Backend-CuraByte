const convertToSixBullets = (text) => {
  if (!text || text.split(" ").length < 12) {
    return [
      "- Rest completely",
      "- Drink fluids regularly",
      "- Eat light food",
      "- Take fever tablet if needed",
      "- Use cool compress",
      "- Any other symptoms?",
    ].join("\n");
  }

  const words = text.split(" ");
  const chunkSize = Math.max(2, Math.floor(words.length / 6));

  const bullets = [];
  let index = 0;

  for (let i = 0; i < 6; i++) {
    const chunk = words.slice(index, index + chunkSize);
    index += chunkSize;

    bullets.push(`- ${chunk.join(" ")}`);
  }

  return bullets.join("\n");
};


module.exports = convertToSixBullets