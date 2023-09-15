const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { prefix } = require('../botconfig/config');

module.exports = {
  name: 'help',
  description: 'Menampilkan menu bantuan',
  execute(message) {
    const helpEmbed = new MessageEmbed()
      .setAuthor({
        name: "+62 Radio 📻",
        iconURL: "https://cdn.discordapp.com/avatars/1090120136167538748/0cf61e809ab511aa3f2b3216ac7d4afe.webp?size=1024&width=0&height=256",
        url: "https://62radio.is-a.fun"
      })
      .setTitle('Experience the Diversity of Indonesian Music')
      .setURL("https://62radio.is-a.fun/")
      .setDescription('**📻 Menu Bantuan**')
      .setThumbnail("https://cdn.discordapp.com/attachments/1098969636306960465/1152052342636675162/helpmenu.png")
      .setColor('#ffcb1f')
      .addFields(
        { name: 'ℹ️ Perintah Radio', value: `\`${prefix}radio [nama_stasiun]\` atau \`${prefix}radio [urutan_radio]\` \nUntuk memutar stasiun radio favorit Anda.`, inline: false },
        { name: '📜 Daftar Stasiun Radio', value: `Gunakan \`${prefix}list\` untuk melihat daftar stasiun radio populer.`, inline: false },
        { name: '🔇 Putuskan Koneksi', value: `Gunakan \`${prefix}dc\` untuk memutuskan koneksi bot dari saluran suara.`, inline: false },
        { name: '🤣 Jokes Bapak-bapak', value: `Gunakan \`${prefix}jokes\` untuk mendapatkan jokes bapak-bapak yang lucu.`, inline: false },
        { name: '😺 Gambar Kucing', value: `Gunakan \`${prefix}cat\` untuk melihat gambar kucing yang menggemaskan.`, inline: false },
      )
      .addFields(
        { name: '🔒 Kebijakan Privasi', value: `Gunakan \`${prefix}privacy\` untuk melihat Kebijakan Privasi bot.`, inline: false },
        { name: '📜 Ketentuan Layanan', value: `Gunakan \`${prefix}terms\` untuk melihat Ketentuan Layanan bot.`, inline: false },
      )
      .setFooter({ text: `Request by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ format: 'png', dynamic: true }) })
      .setTimestamp();


          // Create the buttons
    const websiteButton = new MessageButton()
    .setStyle('LINK')
    .setURL('https://62radio.is-a.fun/')
    .setLabel('Website');

  const supportButton = new MessageButton()
    .setStyle('LINK')
    .setURL('https://62radio.is-a.fun/sponsor')
    .setLabel('Dukung Kami');

  const discordButton = new MessageButton()
    .setStyle('LINK')
    .setURL('https://discord.gg/WFfjrQxnfH')
    .setLabel('Server Support');

  const authorButton = new MessageButton()
    .setStyle('LINK')
    .setURL('https://discord.com/users/742457036914294855')
    .setLabel('Pengembang');

  // Create an action row to hold the buttons
  const actionRow = new MessageActionRow().addComponents(
    websiteButton,
    supportButton,
    authorButton,
    discordButton
  );

  message.reply({ embeds: [helpEmbed], components: [actionRow] });
}
};
