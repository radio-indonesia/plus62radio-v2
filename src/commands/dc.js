const { voiceConnections } = require('../../index');

module.exports = {
  name: 'dc',
  description: 'Memutuskan bot dari saluran suara',
  execute(message) {
    try {
      const memberVoiceChannel = message.member.voice.channel;
      if (!memberVoiceChannel) return message.reply(":x: **Anda harus berada di voice channel untuk menggunakan perintah ini!**");
      
      const connection = voiceConnections.get(message.guild.id);
      if (connection) {
        connection.destroy();
        voiceConnections.delete(message.guild.id); // Hapus koneksi dari objek voiceConnections
        message.reply('✅ **Bot berhasil terputus** ');
      } else {
        message.reply('❌ **Bot tidak terhubung ke saluran suara**');
      }
    } catch (error) {
      console.log('Bot Voice State:', message.guild.me.voice);
      console.error('Terjadi kesalahan:', error.message);
      message.reply(`Terjadi kesalahan: ${error.message}`);
    }
  }
};
