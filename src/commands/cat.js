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
      .setAuthor({
        name: `${message.guild.members.me.displayName} Cat Commands`,
        iconURL: message.client.user.displayAvatarURL(),
        url: `https://discord.com/api/oauth2/authorize?client_id=${message.client.user.id}&permissions=8&scope=bot%20applications.commands`,
      })   
      .setTitle("Pap untuk kamu, semangat 💗")
      .setImage("attachment://62radio-cat.png")
      .setColor("#ffcd00")
      .setFooter({text: `© +62 Radio. Made with 💗 inBOGOR.`})
      .setTimestamp();
    
    // Mengirim pesan embed dengan gambar kucing sebagai attachment
    const sentMessage = await message.channel.send({
      embeds: [embed],
      files: [new MessageAttachment(catImage, "62radio-cat.png")]
    });

      // Emoji jempol (👍) dan jempol turun (👎)
      const thumbsUpEmoji = '<a:jempolatas:1170076492399657101>';
      const thumbsDownEmoji = '<a:jempolbawah:1170076534699216927>';

      // Memberikan reaksi pada pesan yang telah dikirim
      await sentMessage.react(thumbsUpEmoji);
      await sentMessage.react(thumbsDownEmoji);
    } catch (error) {
      console.error("Maafin aku sepertinya ada yang salah, coba lagi ya:", error);
    }
  }
};
