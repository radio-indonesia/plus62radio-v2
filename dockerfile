# Gunakan image Node.js LTS sebagai dasar
FROM node:18-slim

# Install python3
RUN apt-get update && apt-get install -y python3 make g++ --fix-missing

# Setel direktori kerja di dalam kontainer
WORKDIR /62radio

# Salin berkas package.json dan yarn.lock ke direktori kerja
COPY package.json yarn.lock ./

# Instal dependensi Node.js dengan Yarn
RUN yarn install

# Salin sumber kode aplikasi ke direktori kerja
COPY . .

# Instal ffmpeg
RUN apt-get update && apt-get install -y ffmpeg

# Tentukan perintah untuk menjalankan aplikasi Anda
CMD [ "node", "index.js" ]
