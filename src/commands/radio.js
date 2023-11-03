const { createAudioPlayer, joinVoiceChannel, createAudioResource } = require('@discordjs/voice');
const { voiceConnections, client } = require('../../index');

const radio = require('../botconfig/radiostation.json');
const { MessageEmbed } = require('discord.js');

client.on('voiceStateUpdate', (oldState, newState) => {
  // Cek apakah bot ada di voice channel
  if (newState.member.user.id === client.user.id) {
    const newChannel = newState.channel;
    if (!newChannel) {
      // Bot terputus dari channel
      const currentConnection = voiceConnections.get(newState.guild.id);
      if (currentConnection) {
        // Ambil informasi radio yang sedang diputar
        const currentRadio = radioArray[currentRadioId];
        
        if (currentRadio) {
          // Buat kembali audio player dan resource
          const player = createAudioPlayer();
          const resource = createAudioResource(currentRadio.url);
          
          // Putar resource di audio player
          player.play(resource);
          
          // Subscribe audio player ke koneksi
          currentConnection.subscribe(player);
        }
      }
    }
  }
});


const radioArray = Object.values(radio);
let currentRadioId = -1;

module.exports = {
  name: 'radio',
  description: 'Memutar stasiun radio',
  async execute(message, args) {
    try {
      const memberVoiceChannel = message.member.voice.channel;
      if (!memberVoiceChannel) {
        const embed = new MessageEmbed()
          .setColor('#ffcd00')
          .setDescription(
            '<a:moocancel:1167715748295213066> **Anda harus berada di voice channel untuk menggunakan perintah ini!**'
          );

        message.channel.send({ embeds: [embed] }).then((reply) => {
          setTimeout(() => {
            reply.delete();
          }, 60000);
        });
        return; // Menghentikan eksekusi jika pengguna tidak ada di voice channel
      }

      if (!args[0]) {
        const embed = new MessageEmbed()
          .setColor('#ffcd00')
          .setDescription(
            '<a:moocancel:1167715748295213066> **Anda lupa memasukkan nama stasiun radio!**\n' +
            '**Penggunaan** : `r.radio [nama-stasiun]`\n' +
            '**Contoh** : `r.radio prambors`'
          );

        message.channel.send({ embeds: [embed] }).then((reply) => {
          setTimeout(() => {
            reply.delete();
          }, 60000);
        });
        return; // Menghentikan eksekusi jika tidak ada argumen
      }

      let radioId = -1;
      const input = args.join(" ").toLowerCase();

      const findStation = (searchTerm) => {
        const radioByName = radioArray.find(station => station.name.toLowerCase().includes(searchTerm));

        if (radioByName) {
          radioId = radioArray.indexOf(radioByName);
        } else if (!isNaN(searchTerm)) {
          const stationIndex = parseInt(searchTerm) - 1;
          if (stationIndex >= 0 && stationIndex < radioArray.length) {
            radioId = stationIndex;
          }
        }
      };
      findStation(input);

      if (radioId === -1) {
        const embed = new MessageEmbed()
          .setColor('#ffcd00')
          .setDescription('<a:moocancel:1167715748295213066> **Stasiun radio tidak ditemukan!**');

        message.channel.send({ embeds: [embed] }).then((reply) => {
          setTimeout(() => {
            reply.delete();
          }, 60000);
        });
        return; // Menghentikan eksekusi jika stasiun radio tidak ditemukan
      }

      // Hentikan pemutaran audio yang sedang berjalan jika ada
      if (currentRadioId !== -1) {
        const currentlyPlayingRadio = radioArray[currentRadioId];
        const existingConnection = voiceConnections.get(message.guild.id);
        if (existingConnection) {
          existingConnection.destroy();
          voiceConnections.delete(message.guild.id);
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
      voiceConnections.set(message.guild.id, connection);

      player.on('stateChange', (oldState, newState) => {
        if (newState.status === 'idle') {
          currentRadioId = -1;

          const embed = new MessageEmbed()
            .setColor('#ffcd00')
            .setDescription('<a:moocancel:1167715748295213066> **Stasiun Radio Telah Dihentikan!**');

          message.channel.send({ embeds: [embed] }).then((reply) => {
            setTimeout(() => {
              reply.delete();
            }, 60000);
          });
        }
      });

      currentRadioId = radioId; // Setel ID stasiun radio yang baru

      const embed = new MessageEmbed()
        .setTitle('Stasiun Radio Sedang Diputar')
        .setImage(radioArray[radioId].logo)
        .setFooter({ text: `Requested By ${message.author.username}`, iconURL: message.author.displayAvatarURL({ format: 'png', dynamic: true }) })
        .setColor('#ffcd00')

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Terjadi kesalahan:', error.message);
      message.reply(`Terjadi kesalahan: ${error.message}`);
    }
  }
};
