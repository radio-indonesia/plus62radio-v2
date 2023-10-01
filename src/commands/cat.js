const { MessageEmbed, MessageAttachment } = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "cat",
  description: "Menampilkan gambar kucing",
  async execute(message) {
    // URL untuk gambar kucing
    const catUrl = "https://cataas.com/cat/cute";

    try {
      // Mengambil gambar kucing dari URL
      const catResponse = await axios.get(catUrl, {
        responseType: "arraybuffer"
      });
      const catImage = Buffer.from(catResponse.data, "binary");

      // Membuat pesan embed dengan gambar kucing sebagai attachment
      const embed = new MessageEmbed()
      .setTitle("Pap untuk kamu, semangat 💗")
      .setImage("attachment://62radio-cat.png")
      .setColor("#ffcd00")
      .setFooter({text: `© 2023 +62 Radio. Made with 💗 inBOGOR.`})
      .setTimestamp();
    
    // Mengirim pesan embed dengan gambar kucing sebagai attachment
    const sentMessage = await message.reply({
      embeds: [embed],
      files: [new MessageAttachment(catImage, "62radio-cat.png")]
    });

      // Emoji jempol (👍) dan jempol turun (👎)
      const thumbsUpEmoji = "👍";
      const thumbsDownEmoji = "👎";

      // Memberikan reaksi pada pesan yang telah dikirim
      await sentMessage.react(thumbsUpEmoji);
      await sentMessage.react(thumbsDownEmoji);
    } catch (error) {
      console.error("Maafin aku sepertinya ada yang salah, coba lagi ya:", error);
    }
  }
};
