const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "terms",
  description: "Ketentuan Layanan",
  async execute(message) {
    const embed = new MessageEmbed() // Menggunakan MessageEmbed, bukan EmbedBuilder
      .setAuthor({
        name: "+62 Radio",
        url: "https://62radio.is-a.fun",
        iconURL: "https://cdn.discordapp.com/avatars/1090120136167538748/0cf61e809ab511aa3f2b3216ac7d4afe.webp?size=1024&width=0&height=256",
      })
      .setTitle("Ketentuan Layanan 📜")
      .setURL("https://62radio.is-a.fun/termsofservice")
      .setDescription("**Perjanjian Penggunaan**\nDengan mengundang [+62 Radio](https://62radio.is-a.fun/) (“bot”) dan menggunakan fitur-fiturnya, Anda menyetujui Ketentuan Layanan dan Kebijakan Privasi bot tersebut.\n\nAnda mengakui bahwa Anda dapat menggunakan bot secara bebas di Server Discord mana pun yang Anda bagikan. Anda dapat mengundangnya ke Server mana pun yang Anda punya hak \"Kelola Server\", dan hak istimewa ini dapat dicabut jika Anda melanggar ketentuan layanan atau kebijakan privasi bot ini atau Ketentuan Layanan, Kebijakan Privasi, atau Pedoman Komunitas dari Perselisihan Inc.\n\nMelalui undangan, bot dapat mengumpulkan data spesifik seperti yang dijelaskan dalam Kebijakan Privasi. Tujuan penggunaan data ini adalah untuk fungsi inti bot, seperti menjalankan perintah.\n\n**Afiliasi**\nBot tidak berafiliasi dengan, didukung, atau dibuat oleh Discord Inc. Koneksi langsung apa pun ke Discord atau objek Merek Dagangnya adalah murni kebetulan. Kami tidak mengklaim kepemilikan hak cipta atas aset, merek dagang, atau kekayaan intelektual Discord lainnya.\n\n**Pengguna di bawah umur**\nBot tidak diizinkan untuk anak di bawah umur 13 tahun atau di bawah izin hukum negaranya. Ini sesuai dengan Ketentuan Layanan Discord. Tidak ada informasi yang akan disimpan secara sadar dari pengguna di bawah umur. Jika diketahui pengguna di bawah umur, kami akan mengambil semua tindakan yang diperlukan untuk menghapus data yang disimpan.\n\n**Beban**\nPengembang dan pemilik bot tidak bertanggung jawab atas individu yang melanggar Ketentuan ini pada waktu tertentu. Hak untuk memperbarui ketentuan ini dimiliki berdasarkan kebijaksanaan kami, memberikan jangka waktu 1 Minggu (7 hari) untuk memilih tidak ikut serta dalam ketentuan ini. Pengguna dapat memilih untuk tidak ikut serta dengan menghapus bot dari server mana pun di mana pengguna mempunyai hak untuk menghapus bot tersebut.")
      .setImage("https://cdn.discordapp.com/attachments/1098969636306960465/1152269977580228700/rradio62.png")
      .setThumbnail("https://cdn.discordapp.com/attachments/1098969636306960465/1152031406453690509/tos62radio.png")
      .setColor("#ffcd00")
      .setFooter({text: `© 2023 +62 Radio. Made with 💗 inBOGOR.`})
      .setTimestamp();

    await message.reply({ embeds: [embed] });
  }
};
