module.exports = {
	customId: "add-music",
	async run(client, int, player, embed) {
		let name = int.customId.split("-").slice(3).join("-").split("-")
		let user = int.customId.split("-")[2];

    /*if(int.customId === "bönceki" & int.customId === "bsonraki" & int.customId === "btekrar" & int.customId === "bduraklar" & int.customId === "bkapat") return await int.reply({
			embeds: [embed(int.guild, int.member.user).setColor("RED").setDescription("hata")],
			ephemeral: true
		});*/

		if (int.member.user.id != user) return await int.reply({
			embeds: [embed(int.guild, int.member.user).setColor("RED").setTitle("Sadece mesajı yazan kişi şarkıyı seçebilir!")],
			ephemeral: true
		});

		let queue = player.createQueue(int.guild, {
			metadata: {
				channel: int.channel
			}
		});

		try {
			if (!queue.connection) await queue.connect(int.member.voice.channel);
		} catch {
			queue.destroy();
			return await int.reply({
				embeds: [embed(int.guild, int.member.user).setColor("RED").setTitle("Bulunduğun kanala katılamıyorum!")],
				ephemeral: true
			});
		};

		let track = await player.search(name, {
			requestedBy: int.user
		}).then(x => x.tracks[0]);

		queue.addTrack(track);
    if (!queue.playing) return queue.play()

		return await int.message.edit({
			embeds: [embed(int.guild, int.member.user).setTitle("➕ Şarkı Eklendi ➕").addField("İsim", `[${track.title}](${track.url})`, true).addField("Yayınlayan", `${track.author}`, true).addField("İzlenme", `${track.views}`, true).addField("Süre", `${track.duration}`, true).setImage(`${track.thumbnail}`)],
			components: []
		});
	}
};