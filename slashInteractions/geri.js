const {
	SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
	name: "geri",
	command: new SlashCommandBuilder().setName("geri").setDescription("Önceden çalan şarkıyı çalar."),
	async run(client, int, player, embed) {

		let queue = player.createQueue(int.guild, {
			metadata: {
				channel: int.channel
			}
		});

		if (queue.previousTracks.length == 0) return await int.reply({
			embeds: [embed(int.guild, int.member.user).setColor("RED").setTitle("Bu komudu kullanman için bir şarkı çalıyor olması gerek!")],
			ephemeral: true
		});

		let nowTrack = queue.previousTracks
		queue.back();

		return await int.reply({
			embeds: [embed(int.guild, int.member.user).setDescription(`**[${nowTrack.title}](${nowTrack.url})** adlı şarkıya geçtim!`).setThumbnail("https://www.shareicon.net/data/2016/11/14/852045_right_512x512.png")]
		});

	}
};