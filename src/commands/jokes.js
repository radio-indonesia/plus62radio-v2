const { MessageEmbed, MessageAttachment } = require('discord.js');
const axios = require('axios');

module.exports = {
  name: 'jokes',
  description: 'Menampilkan lelucon dari URL',
  async execute(message) {
    // URL untuk lelucon
    const jokeUrl = 'https://jokesbapak2.reinaldyrafli.com/api/';

    try {
      // Mengambil gambar lelucon dari URL
      const response = await axios.get(jokeUrl, { responseType: 'arraybuffer' });
      const jokeImage = Buffer.from(response.data, 'binary');

      // Membuat pesan embed dengan gambar sebagai attachment
      const jokeEmbed = new MessageEmbed()
        .setTitle('Lelucon of the Day')
        .setImage('attachment://62radio-joke.png')
        .setColor("ffcd00")
        .setFooter({text: `© 2023 +62 Radio. Made with 💗 inBOGOR.`})
        .setTimestamp();

      // Mengirim pesan embed dengan gambar sebagai attachment
      const sentMessage = await message.reply({ embeds: [jokeEmbed], files: [new MessageAttachment(jokeImage, '62radio-joke.png')] });

      // Emoji jempol (👍) dan jempol turun (👎)
      const thumbsUpEmoji = '👍';
      const thumbsDownEmoji = '👎';

      // Memberikan reaksi pada pesan yang telah dikirim
      await sentMessage.react(thumbsUpEmoji);
      await sentMessage.react(thumbsDownEmoji);
    } catch (error) {
      console.error('Maafin aku sepertinya ada yang salah, coba lagi ya:', error);
    }
  }
};
