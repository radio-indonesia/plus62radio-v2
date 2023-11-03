const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { prefix } = require('../botconfig/config');
module.exports = {
    name: "about",
    description: "Tentang +62 Radio Bot",
    async execute(message) {
        const embed = new MessageEmbed()
            .setAuthor({
                name: `${message.guild.members.me.displayName} About Commands`,
                iconURL: message.client.user.displayAvatarURL(),
                url: `https://discord.com/api/oauth2/authorize?client_id=${message.client.user.id}&permissions=8&scope=bot%20applications.commands`,
            })
            .addFields(
                {
                    name: "Creator",
                    value: "[**romanromannya**](https://is-a.fun/)",
                    inline: true
                },
                {
                    name: "Type",
                    value: "**Music bot**",
                    inline: true
                },
                {
                    name: "Custom bot",
                    value: "[**Patreon**](https://www.patreon.com/LRMN)",
                    inline: true
                },
            )
            .setColor("#ffcd00")
            .setFooter({ text: `Hi, My Work is to play Music Radio.\nYou can check every command by \`${prefix}help\`. I am developed in JavaScript` })


        // Create the buttons
        const inviteButton = new MessageButton()
            .setStyle('LINK')
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=${message.client.user.id}&permissions=8&scope=bot%20applications.commands`)
            .setLabel('Invite');

        const sponsorButton = new MessageButton()
            .setStyle('LINK')
            .setURL("https://62radio.is-a.fun/sponsor")
            .setLabel('Sponsor');

        // Create an action row to hold the buttons
        const actionRow = new MessageActionRow().addComponents(
            inviteButton,
            sponsorButton
        );

        await message.channel.send({ embeds: [embed], components: [actionRow] });
    }
};
