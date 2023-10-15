const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { prefix } = require('../botconfig/config');

module.exports = {
  name: 'help',
  description: 'Menampilkan menu bantuan',
  execute(message) {
    const helpEmbed = new MessageEmbed()
    .setAuthor({
      name: "+62 Radio",
      url: "https://62radio.is-a.fun/",
      iconURL: "https://cdn.discordapp.com/avatars/1090120136167538748/1d5bced34a4a9d90f7033fbc95264faa.webp",
    })
    .setTitle("Experience the Diversity of Indonesian Music")
    .setURL("https://discord.com/oauth2/authorize?client_id=1090120136167538748&permissions=551940254784&redirect_uri=https%3A%2F%2F62radio.is-a.fun%2Fthankyou&response_type=code&scope=guilds.join%20bot%20applications.commands")
    .setDescription("**📻 Menu Bantuan**")
    .addFields(
      {
        name: "ℹ️ Perintah Radio",
        value: `Gunakan \`${prefix}radio [nama_stasiun]\` \nUntuk memutar stasiun radio favorit Anda.`,
        inline: false
      },
      {
        name: "📜 Daftar Stasiun Radio",
        value: `Gunakan \`${prefix}list\` untuk melihat daftar stasiun radio.`,
        inline: false
      },
      {
        name: "🔒 Kebijakan Privasi",
        value: `Gunakan \`${prefix}privacy\` untuk melihat Kebijakan Privasi bot.`,
        inline: false
      },
      {
        name: "📜 Ketentuan Layanan",
        value: `Gunakan \`${prefix}terms\` untuk melihat Ketentuan Layanan bot.`,
        inline: false
      },
      {
        name: "⚙️Perintah tambahan",
        value: `\`${prefix}dc\` memutuskan koneksi bot dari saluran suara.\n\`${prefix}jokes\` untuk mendapatkan jokes bapak-bapak yang lucu.\n\`${prefix}cat\` untuk mendapatkan gambar kucing yang menggemaskan.\n\`${prefix}botinfo\` informasi mengenai bot +62 Radio`,
        inline: false
      },      
    )
    .setColor("#ffcd00")
    .setFooter({
      text: "© 2023 +62 Radio. Made with 💗 inBOGOR.",
    })
    .setTimestamp();

          // Create the buttons
    const websiteButton = new MessageButton()
    .setStyle('LINK')
    .setURL('https://62radio.is-a.fun/')
    .setLabel('Website');

  const inviteButton = new MessageButton()
    .setStyle('LINK')
    .setURL('https://discord.com/oauth2/authorize?client_id=1090120136167538748&permissions=551940254784&redirect_uri=https%3A%2F%2F62radio.is-a.fun%2Fthankyou&response_type=code&scope=guilds.join%20bot%20applications.commands')
    .setLabel('Invite');

  const supportButton = new MessageButton()
    .setStyle('LINK')
    .setURL('https://discord.gg/WFfjrQxnfH')
    .setLabel('Server Support');

  const sponsorButton = new MessageButton()
    .setStyle('LINK')
    .setURL('https://62radio.is-a.fun/sponsor')
    .setLabel('Sponsor');

  // Create an action row to hold the buttons
  const actionRow = new MessageActionRow().addComponents(
    websiteButton,
    inviteButton,
    supportButton,
    sponsorButton
  );

  message.reply({ embeds: [helpEmbed], components: [actionRow] });
}
};
