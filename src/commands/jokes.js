const { MessageEmbed, MessageAttachment } = require('discord.js');
const axios = require('axios');

module.exports = {
  name: 'jokes',
  description: 'Menampilkan lelucon khas bapak2',
  async execute(message) {
    // URL untuk lelucon
    const jokeUrl = 'https://jokesbapak2.reinaldyrafli.com/api/';

    try {
      // Mengambil gambar lelucon dari URL
      const response = await axios.get(jokeUrl, { responseType: 'arraybuffer' });
      const jokeImage = Buffer.from(response.data, 'binary');

      // Membuat pesan embed dengan gambar sebagai attachment
      const jokeEmbed = new MessageEmbed()
        .setAuthor({
          name: `${message.guild.members.me.displayName} Jokes Commands`,
          iconURL: message.client.user.displayAvatarURL(),
          url: `https://discord.com/api/oauth2/authorize?client_id=${message.client.user.id}&permissions=8&scope=bot%20applications.commands`,
        })
        .setTitle('Lelucon of the Day')
        .setImage('attachment://62radio-joke.png')
        .setColor("ffcd00")
        .setFooter({ text: `© +62 Radio. Made with 💗 inBOGOR.` })
        .setTimestamp();

      // Mengirim pesan embed dengan gambar sebagai attachment
      const sentMessage = await message.channel.send({ embeds: [jokeEmbed], files: [new MessageAttachment(jokeImage, '62radio-joke.png')] });

      // Emoji jempol (👍) dan jempol turun (👎)
      const thumbsUpEmoji = '<a:jempolatas:1170076492399657101>';
      const thumbsDownEmoji = '<a:jempolbawah:1170076534699216927>';

      // Memberikan reaksi pada pesan yang telah dikirim
      await sentMessage.react(thumbsUpEmoji);
      await sentMessage.react(thumbsDownEmoji);
    } catch (error) {
      console.error('Maafin aku sepertinya ada yang salah, coba lagi ya:', error);
    }
  }
};
