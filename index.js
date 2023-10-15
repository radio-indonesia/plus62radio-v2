const { Client, Intents, Collection, WebhookClient } = require('discord.js');
const { token, prefix, webhookURL, mongodbURI, topggToken, port } = require('./src/botconfig/config');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const fs = require('fs').promises;
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const fetch = require('node-fetch');

const express = require('express');
const app = express();

const client = new Client({
  shardCount: 5, // Total number of shards
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

// Objek untuk menyimpan informasi koneksi suara per server
const voiceConnections = new Map();

// Inisialisasi cache
const audioCache = new Map();

// Koleksi perintah
client.commands = new Collection();

const startBot = async () => {
  try {
    // Kode koneksi MongoDB
    await mongoose.connect(mongodbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB terhubung!");

    const GuildSchema = new mongoose.Schema({
      guildID: String,
      // Tambahkan bidang lain sesuai kebutuhan
    });

    const Guild = mongoose.model("Guild", GuildSchema);
  } catch (error) {
    console.error("Gagal terhubung ke MongoDB:", error);
    return;
  }

  const commandFiles = await fs.readdir('./src/commands');
  
  for (const file of commandFiles) {
    if (file.endsWith('.js')) {
      const command = require(path.join(__dirname, 'src', 'commands', file));
      client.commands.set(command.name, command);
    }
  }

  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
    
    // Daftar aktivitas yang akan digunakan secara bergantian
    const activities = ["Radio FM & Fun", `prefix ${prefix}`];
    let currentActivityIndex = 0;

    // Fungsi untuk mengubah aktivitas
    function setNextActivity() {
      client.user.setActivity(activities[currentActivityIndex], { type: 'LISTENING' });
      currentActivityIndex = (currentActivityIndex + 1) % activities.length;
    }

    // Set aktivitas awal
    setNextActivity();

    // Mengubah aktivitas setiap 10 detik (sesuaikan sesuai kebutuhan)
    setInterval(setNextActivity, 10000);
  });

  // Fungsi untuk mengirim statistik bot ke Top.gg
// Fungsi untuk mengirim statistik bot ke Top.gg
const postStats = async (shardId) => {
  const serverCount = client.guilds.cache.size; // Jumlah server
  const shardCount = client.options.shardCount; // Jumlah shard

  const data = {
    server_count: serverCount,
    shard_id: shardId, // Menggunakan shardId dari parameter fungsi
    shard_count: shardCount,
  };

  try {
    const response = await fetch(`https://top.gg/api/bots/${client.user.id}/stats`, {
      method: 'POST',
      headers: {
        Authorization: topggToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log(`Statistik bot shard ${shardId}, shard count ${shardCount}, server count ${serverCount},  berhasil dikirim ke Top.gg.`);
    } else {
      console.error(`Gagal mengirim statistik bot shard ${shardId}, shard count ${shardCount}, server count ${serverCount} ke Top.gg: ${response.statusText}`);
    }
  } catch (error) {
    console.error(`Terjadi kesalahan saat mengirim statistik bot shard ${shardId}, shard count ${shardCount}, server count ${serverCount} ke Top.gg:`, error);
  }
};

// Kirim statistik ke Top.gg saat bot siap
client.once("ready", async () => {
  for (let shardId = 0; shardId < client.options.shardCount; shardId++) {
    await postStats(shardId); // Menunggu pengiriman statistik selesai sebelum melanjutkan ke shard berikutnya
  }
});

  client.on("guildCreate", async (guild) => {
    console.log(`Bot diundang ke server: ${guild.name} (ID: ${guild.id})`);

    // Simpan informasi guild ke dalam MongoDB
    const newGuild = new Guild({
      guildID: guild.id,
      // Tambahkan bidang lain sesuai kebutuhan
    });

    await newGuild.save();

    // Mengirim notifikasi ke channel Discord melalui webhook
    const webhook = new WebhookClient({ url: webhookURL });
    const message = `Bot diundang ke server: ${guild.name} (ID: ${guild.id})`;
    await webhook.send(message);
  });

  client.on("guildDelete", async (guild) => {
    console.log(`Bot dikeluarkan dari server: ${guild.name} (ID: ${guild.id})`);

    // Hapus informasi guild dari MongoDB berdasarkan guild ID
    await Guild.findOneAndDelete({ guildID: guild.id });

    // Mengirim notifikasi ke channel Discord melalui webhook
    const webhook = new WebhookClient({ url: webhookURL });
    const message = `Bot dikeluarkan dari server: ${guild.name} (ID: ${guild.id})`;
    await webhook.send(message);
  });

  client.on("messageCreate", async (message) => {
    try {
      if (!message.content.startsWith(prefix) || message.author.bot) return;

      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const commandName = args.shift().toLowerCase();

      const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

      if (!command) {
        return message.reply(`:x: **Perintah '${commandName}' tidak ditemukan!**`);
      }

      command.execute(message, args, client);
    } catch (error) {
      console.error('Terjadi kesalahan:', error.message);
      message.reply(`:x: **Terjadi kesalahan: ${error.message}**`);
    }
  });

  client.login(token).then(() => {
    console.log(`Bot is listening on port ${port}`);
    app.get('/', (req, res) => {
      res.send('Bot is up and running!');
    });
    
    const stopServer = () => {
      console.log('Bot is stopping, closing server...');
      app.close(() => {
        console.log('Server closed. Bot is now offline.');
        process.exit(0);
      });
    };

    client.on('disconnect', () => {
      stopServer();
    });

    client.on('error', (error) => {
      console.error('Bot encountered an error:', error);
      stopServer();
    });
  });
};

startBot();

module.exports = {
  client,
  voiceConnections,
  audioCache,
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
};
