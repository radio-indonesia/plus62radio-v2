const { voiceConnections } = require('../../index');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'dc',
  description: 'Memutuskan bot dari saluran suara',
  execute(message) {
    try {
      const memberVoiceChannel = message.member.voice.channel;
      if (!memberVoiceChannel) {
        const embed = new MessageEmbed()
          .setColor('#ffcd00')
          .setDescription('<a:moocancel:1167715748295213066> **Anda harus berada di voice channel untuk menggunakan perintah ini!**');
        return message.channel.send({ embeds: [embed] });
      }

      const connection = voiceConnections.get(message.guild.id);
      if (connection) {
        connection.destroy();
        voiceConnections.delete(message.guild.id);
        const embed = new MessageEmbed()
          .setColor('#ffcd00')
          .setDescription('<a:moooke:1167714676482768976> **Bot berhasil terputus**');
        message.channel.send({ embeds: [embed] });
      } else {
        const embed = new MessageEmbed()
          .setColor('#ffcd00')
          .setDescription('<a:moocancel:1167715748295213066> **Bot tidak terhubung ke saluran suara**');
        message.channel.send({ embeds: [embed] });
      }
    } catch (error) {
      console.log('Bot Voice State:', message.guild.me.voice);
      console.error('Terjadi kesalahan:', error.message);
      const embed = new MessageEmbed()
        .setColor('#ffcd00')
        .setDescription(`Terjadi kesalahan: ${error.message}`);
      message.channel.send({ embeds: [embed] });
    }
  }
};
