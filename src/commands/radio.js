const { createAudioPlayer, joinVoiceChannel, createAudioResource } = require('@discordjs/voice');
const { voiceConnections } = require('../../index');
const radio = require('../botconfig/radiostation.json');
const { MessageEmbed } = require('discord.js');

const radioArray = Object.values(radio);
let currentRadioId = -1;

module.exports = {
  name: 'radio',
  description: 'Memainkan stasiun radio',
  async execute(message, args) {
    try {
      if (!args[0]) return message.reply(":x: **Anda lupa memasukkan nama atau nomor stasiun radio!** \n **Penggunaan** : ``r.radio [nama-stasiun]`` \n **contoh** : ``!radio Prambors``");

      const memberVoiceChannel = message.member.voice.channel;
      if (!memberVoiceChannel) return message.reply(":x: **Anda harus berada di voice channel untuk menggunakan perintah ini!**");

      let radioId = -1;
      const input = args.join(" ").toLowerCase();

      const findStation = (searchTerm) => {
        const radioByName = radioArray.find(station => station.name.toLowerCase().includes(searchTerm));
      
        if (radioByName) {
          radioId = radioArray.indexOf(radioByName);
        } else if (!isNaN(searchTerm)) {
          const stationIndex = parseInt(searchTerm) - 1; // Ubah nomor stasiun menjadi indeks
          if (stationIndex >= 0 && stationIndex < radioArray.length) {
            radioId = stationIndex;
          }
        }
      };

      findStation(input);

      if (radioId === -1) {
        return message.reply(":x: **Stasiun radio tidak ditemukan!**");
      }

      // Hentikan pemutaran audio yang sedang berjalan jika ada
      if (currentRadioId !== -1) {
        const currentlyPlayingRadio = radioArray[currentRadioId];
        const existingConnection = voiceConnections.get(message.guild.id);
        if (existingConnection) {
          existingConnection.destroy();
          voiceConnections.delete(message.guild.id); // Hapus koneksi yang sudah ada
        }
      }

      const connection = joinVoiceChannel({
        channelId: memberVoiceChannel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
      });

      const player = createAudioPlayer();

      const resource = createAudioResource(radioArray[radioId].url);
      player.play(resource);

      connection.subscribe(player);
      voiceConnections.set(message.guild.id, connection); // Simpan koneksi suara di voiceConnections

      player.on('stateChange', (oldState, newState) => {
        if (newState.status === 'idle') {
          // Tidak perlu melakukan apa pun saat pemutaran selesai
          currentRadioId = -1;
          connection.destroy();
          voiceConnections.delete(message.guild.id); // Hapus koneksi suara setelah pemutaran selesai
          message.reply(':x: **Stasiun Radio Telah Dihentikan!**');
        }
      });

      currentRadioId = radioId; // Setel ID stasiun radio yang baru

      const embed = new MessageEmbed()
      .setTitle('Stasiun Radio Sedang Diputar')
      .setDescription(radioArray[radioId].name)
      .setImage(radioArray[radioId].logo)
      .setFooter({ text: `Requested By ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: 'png', dynamic: true }) })
      .setColor('#3498db')
      .setTimestamp();
    

      message.channel.send({ embeds: [embed] });

    } catch (error) {
      console.error('Terjadi kesalahan:', error.message);
      message.reply(`Terjadi kesalahan: ${error.message}`);
    }
  }
};
