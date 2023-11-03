const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'privacy',
  description: "Kebijakan Privasi",
  async execute(message) {
    const embed = new MessageEmbed()
      .setAuthor({
        name: `${message.guild.members.me.displayName} Privacy Commands`,
        iconURL: message.client.user.displayAvatarURL(),
        url: `https://discord.com/api/oauth2/authorize?client_id=${message.client.user.id}&permissions=8&scope=bot%20applications.commands`,
      })
      .setTitle("Kebijakan Privasi 🔒")
      .setURL("https://62radio.is-a.fun/termsofservice")
      .setDescription("Perjanjian Penggunaan Penggunaan [+62 Radio](https://62radio.is-a.fun/) (\"bot\") di server memerlukan pengumpulan beberapa data pengguna tertentu. Data yang dikumpulkan mencakup, namun tidak terbatas pada, nilai ID pengguna Discord, nama panggilan pengguna Discord, dan peran server pengguna. Penggunaan Bot dianggap sebagai persetujuan terhadap ketentuan kebijakan ini.\n\n**Akses ke Data**\nAkses ke data hanya diizinkan untuk pengembang bot dan layanan hosting dan hanya dalam lingkup yang diperlukan untuk pengembangan, pengujian, dan implementasi fitur bot. Data tidak dijual, diberikan kepada, atau dibagikan kepada pihak ketiga mana pun, kecuali jika diwajibkan oleh hukum atau perjanjian Ketentuan Layanan. Anda dapat melihat Data berdasarkan permintaan [romanromannya#0](https://discord.com/users/742457036914294855).\n\n**Penyimpanan Data**\nData disimpan dalam database PlanetScale. Basis data diamankan untuk mencegah akses eksternal. Namun, tidak ada jaminan yang diberikan, dan pemilik Bot tidak bertanggung jawab atas pelanggaran data yang tidak disengaja atau berbahaya. Jika terjadi akses Data yang tidak sah, staf server akan memberi tahu pengguna melalui Server Dukungan.\n\n**Hak Pengguna**\nKapan saja, Anda berhak meminta untuk melihat data akun Discord Anda. Anda berhak meminta penghapusan Data yang relevan. Untuk melakukan ini, pengguna harus mengirimkan permintaan melalui Server Dukungan.\n\n**Pertanyaan**\nJika Anda memiliki pertanyaan atau khawatir tentang data apa yang mungkin disimpan dari akun Anda, hubungi [romanromannya#0](https://discord.com/users/742457036914294855). Untuk informasi lebih lanjut, periksa Ketentuan Layanan Discord.")
      .setThumbnail("https://cdn.discordapp.com/attachments/1098969636306960465/1152052977264234698/privacy62radio.png")
      .setImage("https://cdn.discordapp.com/attachments/1098969636306960465/1152269977580228700/rradio62.png")
      .setColor("#ffcd00")
      .setFooter({ text: `© +62 Radio. Made with 💗 inBOGOR.` })
      .setTimestamp();

    await message.channel.send({ embeds: [embed] });

  },
};
