const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const os = require('os');
const { version } = require('../../package.json');
const { prefix } = require('../botconfig/config');

module.exports = {
    name: 'botinfo',
    description: 'Menampilkan informasi tentang bot',
    async execute(interaction) {
        const { client } = interaction;

        // STATS
        const guilds = client.guilds.cache.size;
        const channels = client.channels.cache.size;
        const users = client.guilds.cache.reduce((size, g) => size + g.memberCount, 0);
        const botInfoEmbed = new MessageEmbed()
        .setAuthor({
            name: "+62 Radio 📻",
            icon_url: "https://cdn.discordapp.com/avatars/1090120136167538748/1d5bced34a4a9d90f7033fbc95264faa.webp",
            url: "https://62radio.is-a.fun"
        })
            .setTitle('Experience the Diversity of Indonesian Music')
            .setURL("https://62radio.is-a.fun/")
            .setDescription('**🤖 Bot Information**')
            .setThumbnail("https://cdn.discordapp.com/attachments/1098969636306960465/1152052342636675162/helpmenu.png")
            .setColor('#ffcd00')
            .addFields(
                { name: 'Server Stats', value: `❒ Total guilds: ${guilds}\n❒ Total users: ${users}\n❒ Total channels: ${channels}\n❒ Websocket Ping: ${Math.round(client.ws.ping)} ms`, inline: false },
                { name: 'CPU', value: `❯ **OS:** ${os.platform()} [${os.arch()}]\n❯ **Cores:** ${os.cpus().length}\n❯ **Usage:** ${(os.totalmem() - os.freemem()) / 1024} MB`, inline: true },
                { name: "Bot's RAM", value: `❯ **Used:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\n❯ **Available:** ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB\n❯ **Usage:** ${(((process.memoryUsage().heapUsed / os.totalmem()) * 100).toFixed(2))}%`, inline: true },
                { name: "Overall RAM", value: `❯ **Used:** ${((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(2)} GB\n❯ **Available:** ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB\n❯ **Usage:** ${(((os.totalmem() - os.freemem()) / os.totalmem()) * 100).toFixed(2)}%`, inline: true },
                { name: '❯ Node.js Version', value: `v${process.versions.node}`, inline: true },
                { name: '❯ Bot Version', value: `v${version}`, inline: true },
                { name: '❯ Uptime', value: msToTime(client.uptime), inline: true }
            )
            .setFooter({
                text: '© 2023 +62 Radio. Made with 💗 in BOGOR'
            })
            .setTimestamp();

        // Create the buttons
        const websiteButton = new MessageButton()
            .setStyle('LINK')
            .setURL('https://hop.io/')
            .setLabel('Hosted by Hop.io');

        const sponsorButton = new MessageButton()
            .setStyle('LINK')
            .setURL('https://62radio.is-a.fun/sponsor')
            .setLabel('Sponsor');

        const authorButton = new MessageButton()
            .setStyle('LINK')
            .setURL('https://discord.com/users/742457036914294855')
            .setLabel('Bot Developer');

        const supportButton = new MessageButton()
            .setStyle('LINK')
            .setURL('https://discord.gg/WFfjrQxnfH')
            .setLabel('Server Support');

        // Create an action row to hold the buttons
        const actionRow = new MessageActionRow().addComponents(
            websiteButton,
            authorButton,
            sponsorButton,
            supportButton
        );

        interaction.reply({ embeds: [botInfoEmbed], components: [actionRow] });
    }
};

function msToTime(duration) {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const days = Math.floor(duration / (1000 * 60 * 60 * 24));

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}
