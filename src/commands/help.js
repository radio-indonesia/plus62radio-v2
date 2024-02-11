const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js');
const { prefix } = require('../botconfig/config');
const { aliases } = require('./radio');
const fs = require('fs').promises;

module.exports = {
  name: 'help',
  description: 'Menampilkan menu bantuan',
  aliases: 'h',
  usage: ``,
  async execute(message) {
    const { client } = message;

    // Membaca data radio dari file JSON
    const contents = await fs.readFile('./src/botconfig/radioid.json', 'utf8');
    const radioData = JSON.parse(contents).radioid;

    // Membuat pesan embed untuk daftar stasiun radio
    const radioListEmbed = new MessageEmbed()
    .setAuthor({
      name: `${message.guild.members.me.displayName} Radiolist Commands`,
      iconURL: message.client.user.displayAvatarURL(),
      url: `https://discord.com/api/oauth2/authorize?client_id=${message.client.user.id}&permissions=8&scope=bot%20applications.commands`,
    })    
    .setTitle('<a:62radio:1167680653060485160> Daftar Stasiun Radio <a:62radio:1167680653060485160>')
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${message.client.user.id}&permissions=8&scope=bot%20applications.commands`)
    .setDescription(`Gunakan \`${prefix}play [nama_stasiun]\` untuk memainkannya.\nContoh: \`${prefix}play prambors\``)
    .setColor('#ffcd00')
    .setImage('https://cdn.is-a.fun/62radio/62radio.gif')
    .setFooter({
      text: '© +62 Radio. Made with 💗 in BOGOR.',
    })    
    .setTimestamp();
  

    // Mengatur daftar stasiun radio dalam 2 kolom
    const radioEntries = Object.entries(radioData);
    const numColumns = 2;

    for (let i = 0; i < numColumns; i++) {
      const columnEntries = radioEntries.slice(i * Math.ceil(radioEntries.length / numColumns), (i + 1) * Math.ceil(radioEntries.length / numColumns));
      const columnText = columnEntries.map(([name, id]) => `:radio: **${id}** - ${name}`).join('\n');
      radioListEmbed.addFields({ name: `Stasiun Radio ${i + 1}`, value: columnText, inline: true });
    }

    // Membuat Select Menu
    const selectMenu = new MessageSelectMenu()
      .setCustomId('menu')
      .setPlaceholder('Pilih menu')
      .addOptions([
        {
          label: 'Commands',
          value: 'commands',
          description: 'Lihat daftar semua perintah',
        },
        {
          label: 'Radio List',
          value: 'radiolist',
          description: 'Lihat daftar stasiun radio populer',
        },
        {
          label: 'Home',
          value: 'home',
          description: 'Kembali ke menu awal',
        },
      ]);

    // Membuat Action Row untuk Select Menu
    const actionRow = new MessageActionRow().addComponents(selectMenu);

    const helpEmbed = new MessageEmbed()
    .setAuthor({
      name: `${message.guild.members.me.displayName} Help Commands`,
      iconURL: message.client.user.displayAvatarURL(),
      url: `https://discord.com/api/oauth2/authorize?client_id=${message.client.user.id}&permissions=8&scope=bot%20applications.commands`,
    })  
      .setTitle('a simple Discord music bot to play a radio from some Indonesian radio-station!')
      .setDescription(
        '<a:mewwme_love:1168458069395648522> **Do you want to customize the bot?** [**Subscribe**](https://www.patreon.com/LRMN/membership)'
      )
      .setImage('https://cdn.is-a.fun/62radio/62radio.gif')
      .setColor('#ffcd00');

    // Kirim pesan dengan Select Menu
    const sentMessage = await message.channel.send({ embeds: [helpEmbed], components: [actionRow] });

    // Menangani respons dari Select Menu
    const filter = (interaction) => interaction.customId === 'menu' && interaction.user.id === message.author.id;

    const collector = sentMessage.createMessageComponentCollector({ filter, time: 30000 });

    collector.on('collect', async (interaction) => {
      const selectedValue = interaction.values[0];

      if (selectedValue === 'home') {
        // Tangani pemilihan "Home" di sini
        // Anda dapat memperbarui atau mengirim ulang pesan bantuan awal
        sentMessage.edit({ embeds: [helpEmbed], components: [actionRow] });
      } else if (selectedValue === 'commands') {
        // Tangani pemilihan "Commands" di sini
        // Anda dapat mengirim daftar perintah sebagai embed
        const commandListEmbed = new MessageEmbed()
        .setAuthor({
          name: `${message.guild.members.me.displayName} All Commands`,
          iconURL: message.client.user.displayAvatarURL(),
          url: `https://discord.com/api/oauth2/authorize?client_id=${message.client.user.id}&permissions=8&scope=bot%20applications.commands`,
      })
        .setTitle("Experience the Diversity of Indonesian Music")
        .setURL("https://62radio.is-a.fun/")
        .setDescription("**<a:tunesia_prefix:1167678316770238584> Daftar perintah yang tersedia:**")
        .addFields(
          {
            name: "<a:acaaah:1167688811560579123> Perintah Radio",
            value: `Gunakan \`${prefix}play [nama_stasiun]\` \nUntuk memutar stasiun radio favorit Anda.`,
            inline: false
          },
          {
            name: "<a:62radio:1167680653060485160> Daftar Stasiun Radio",
            value: `Gunakan \`${prefix}list\` untuk melihat daftar stasiun radio.`,
            inline: false
          },
          {
            name: "<a:tragic5:1169269912989089872> Perintah tambahan",
            value: `\`${prefix}dc\`, \`${prefix}stats\`, \`${prefix}jokes\`, \`${prefix}cat\`, \`${prefix}about\`, \`${prefix}terms\`, \`${prefix}privacy\`, \`${prefix}help\``,
            inline: false
          },      
        )
        .setImage("https://cdn.is-a.fun/62radio/62radio.gif")
        .setColor("#ffcd00")
        .setFooter({
          text: "© 2023 +62 Radio. Made with 💗 inBOGOR.",
        })
        .setTimestamp();

        sentMessage.edit({ embeds: [commandListEmbed], components: [actionRow] });
      } else if (selectedValue === 'radiolist') {
        // Tangani pemilihan "Radio List" di sini
        // Anda dapat memproses daftar stasiun radio
        sentMessage.edit({ embeds: [radioListEmbed], components: [actionRow] });
      }

      // Hapus respons dari pengguna
      interaction.deferUpdate();
    });

    collector.on('end', () => {
      // Setelah 10 detik, nonaktifkan Select Menu
      actionRow.components.forEach((component) => {
        component.setDisabled(true);
      });
    
      sentMessage.edit({ components: [actionRow] });
    
      // Kembalikan tampilan ke menu "Home"
      sentMessage.edit({ embeds: [helpEmbed], components: [actionRow] });
    });
  }
};    