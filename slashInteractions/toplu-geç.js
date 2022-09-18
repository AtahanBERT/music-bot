const {
	SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
	name: "toplu-geç",
	command: new SlashCommandBuilder().setName("toplu-geç").setDescription("Sıradan şarkıları toplu bir şekilde geçebilirsiniz.").addIntegerOption(o => o.setName("sayı").setDescription("Geçilecek şarkının sıra numarası.").setRequired(true)),
	async run(client, int, player, embed) {

		let şarkı = int.options.getInteger("sayı");

		if (isNaN(şarkı)) return await int.reply({
			embeds: [embed(int.guild, int.member.user).setColor("RED").setTitle("Bir sayı girin!")],
			ephemeral: true
		});


		let queue = player.createQueue(int.guild, {
			metadata: {
				channel: int.channel
			}
		});

		if (şarkı > queue.tracks.length || şarkı <= 0) return await int.reply({
			embeds: [embed(int.guild, int.member.user).setColor("RED").setTitle("Girdiğiniz sayıda bir şarkı yok!")],
			ephemeral: true
		});


		let removedTrack = queue.tracks[şarkı - 1];
		queue.skipTo(removedTrack);

		return await int.reply({
			embeds: [embed(int.guild, int.member.user).setDescription(`**[${removedTrack.title}](${removedTrack.url})** adlı şarkıya geçtim!`)]
		});

	}
};