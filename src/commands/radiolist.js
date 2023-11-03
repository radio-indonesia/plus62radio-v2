const { MessageActionRow, MessageEmbed } = require('discord.js');
const { prefix } = require('../botconfig/config');
const fs = require('fs').promises;

module.exports = {
  name: 'list',
  description: 'Menampilkan daftar stasiun radio',
  async execute(message, args) {
    try {
      const contents = await fs.readFile('./src/botconfig/radioid.json', 'utf8');
      const radioData = JSON.parse(contents).radioid;

      const radiodembed = new MessageEmbed()
        .setAuthor({
          name: `${message.guild.members.me.displayName} Radiolist Commands`,
          iconURL: message.client.user.displayAvatarURL(),
          url: `https://discord.com/api/oauth2/authorize?client_id=${message.client.user.id}&permissions=8&scope=bot%20applications.commands`,
        })
        .setTitle('<a:62radio:1167680653060485160> Daftar Stasiun Radio <a:62radio:1167680653060485160>')
        .setURL("https://62radio.is-a.fun/")
        .setDescription(`Gunakan \`${prefix}radio [nama_stasiun]\` untuk memainkannya.`)
        .setColor('#ffcd00')
        .setFooter({
          text: '© +62 Radio. Made with 💗 in BOGOR.',
        })
        .setTimestamp();

      const radioEntries = Object.entries(radioData);
      const numColumns = 2; // Mengubah jumlah kolom menjadi 2

      for (let i = 0; i < numColumns; i++) {
        const columnEntries = radioEntries.slice(i * Math.ceil(radioEntries.length / numColumns), (i + 1) * Math.ceil(radioEntries.length / numColumns));
        const columnText = columnEntries.map(([name, id]) => `:radio: **${id}** - ${name}`).join('\n');
        radiodembed.addFields({ name: `Stasiun Radio ${i + 1}`, value: columnText, inline: true });
      }

      message.channel.send({ embeds: [radiodembed] });
    } catch (error) {
      console.error('Error:', error);
      return message.channel.send('Terjadi kesalahan saat menampilkan daftar stasiun radio. Coba lagi ya');
    }
  },
};
