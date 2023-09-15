const { Client, Intents, Collection } = require('discord.js');
const { token, prefix, clientId, guildId } = require('./src/botconfig/config.json');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs').promises;
const path = require('path');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

const voiceConnections = new Map();
const audioCache = new Map();
client.commands = new Collection();

const rest = new REST({ version: '10' }).setToken(token);

let commands = [];

async function registerSlashCommands() {
  try {
    console.log('Started registering slash commands.');

    if (commands.length > 0) {
      console.log('Clearing existing slash commands.');
      await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: [] }
      );
    }

    const radioCommand = new SlashCommandBuilder()
      .setName('radio')
      .setDescription('Memutar stasiun radio favorit Anda.')
      .addStringOption(option =>
        option.setName('station')
          .setDescription('Nama atau nomor stasiun radio')
          .setRequired(true));

    const radiolistCommand = new SlashCommandBuilder()
      .setName('radiolist')
      .setDescription('Tampilkan daftar stasiun radio populer.');

    const helpCommand = new SlashCommandBuilder()
      .setName('help')
      .setDescription('Menampilkan menu bantuan.');

    const privacyCommand = new SlashCommandBuilder()
      .setName('privacy')
      .setDescription('Lihat Kebijakan Privasi bot.');

    const termsCommand = new SlashCommandBuilder()
      .setName('terms')
      .setDescription('Lihat Ketentuan Layanan bot.');

    const aboutCommand = new SlashCommandBuilder()
      .setName('about')
      .setDescription('Tentang bot.');

    commands = [
      radioCommand.toJSON(),
      radiolistCommand.toJSON(),
      helpCommand.toJSON(),
      privacyCommand.toJSON(),
      termsCommand.toJSON(),
      aboutCommand.toJSON(),
    ];

    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );

    console.log('Successfully registered slash commands.');
  } catch (error) {
    console.error('Error registering slash commands:', error);
  }
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'reloadcommands') {
    registerSlashCommands();
    await interaction.reply('Slash commands have been reloaded!');
  } else {
    // Handle other slash commands as usual
  }
});

(async () => {
  const commandFiles = await fs.readdir('./src/commands');

  for (const file of commandFiles) {
    if (file.endsWith('.js')) {
      const command = require(path.join(__dirname, 'src', 'commands', file));
      client.commands.set(command.name, command);
    }
  }
})();

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity('Coded By: Hesam TooVinS', { type: 'WATCHING' });
  registerSlashCommands();
});

client.login(token);



