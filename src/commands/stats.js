const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const os = require('os');
const { version } = require('../../package.json');
const { prefix } = require('../botconfig/config');

module.exports = {
    name: 'stats',
    description: 'Menampilkan informasi statistik bot',
    aliases: ['stat'],
    async execute(message) {
        const { client } = message;

        // STATS
        const guilds = client.guilds.cache.size;
        const channels = client.channels.cache.size;
        const users = client.guilds.cache.reduce((size, g) => size + g.memberCount, 0);
        const statsEmbed = new MessageEmbed()
            .setAuthor({
                name: `${message.guild.members.me.displayName} Info bot Commands`,
                iconURL: message.client.user.displayAvatarURL(),
                url: `https://discord.com/api/oauth2/authorize?client_id=${message.client.user.id}&permissions=8&scope=bot%20applications.commands`,
            })
            .setTitle('**🤖 Bot Information**')
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
        const inviteButton = new MessageButton()
            .setStyle('LINK')
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=${message.client.user.id}&permissions=8&scope=bot%20applications.commands`)
            .setLabel('Invite');

        const supportButton = new MessageButton()
            .setStyle('LINK')
            .setURL('https://discord.gg/6EXgrmtkPX')
            .setLabel('Server Support');

        // Create an action row to hold the buttons
        const actionRow = new MessageActionRow().addComponents(
            inviteButton,
            supportButton
        );

        message.channel.send({ embeds: [statsEmbed], components: [actionRow] });
    }
};

function msToTime(duration) {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const days = Math.floor(duration / (1000 * 60 * 60 * 24));

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}