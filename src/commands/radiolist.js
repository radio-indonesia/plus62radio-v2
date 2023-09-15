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
        .setTitle('Daftar Stasiun Radio')
        .setDescription(`Gunakan \`${prefix}radio [nama_stasiun]\` untuk memainkannya.`)
        .setColor('#65cb88')
        .setThumbnail('https://cdn.discordapp.com/avatars/1090120136167538748/1d5bced34a4a9d90f7033fbc95264faa.webp?size=1024&width=0&height=256')
        .setFooter({
          text: `Request by ${message.author.username}`,
          iconURL: message.author.displayAvatarURL({ format: 'png', dynamic: true }),
        })        
        .setTimestamp();

      const radioEntries = Object.entries(radioData);
      const numColumns = 2; // Mengubah jumlah kolom menjadi 2

      for (let i = 0; i < numColumns; i++) {
        const columnEntries = radioEntries.slice(i * Math.ceil(radioEntries.length / numColumns), (i + 1) * Math.ceil(radioEntries.length / numColumns));
        const columnText = columnEntries.map(([name, id]) => `:radio: **${id}** - ${name}`).join('\n');
        radiodembed.addFields({ name: `Stasiun Radio ${i + 1}`, value: columnText, inline: true });
      }

      message.reply({ embeds: [radiodembed] });
    } catch (error) {
      console.error('Error:', error);
      return message.reply('Terjadi kesalahan saat menampilkan daftar stasiun radio. Coba lagi ya');
    }
  },
};
