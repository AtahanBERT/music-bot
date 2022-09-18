module.exports = {
	customId: "bkapat",
	async run(client, int, player, embed) {

    let queue = player.getQueue(int.guild, {
			metadata: {
				channel: int.channel
			}
		});
    
      queue.destroy(true);

		await int.reply({
			embeds: [embed(int.guild, int.member.user).setTitle("Sırayı sildim ve sesten çıktım!").setThumbnail("https://rukminim2.flixcart.com/image/416/416/kbb49zk0/poster/8/k/x/large-exit-sign-poster-rit-86-original-imafszfjghvms6n6.jpeg?q=70")]
		});

int.message.edit({components: []})
    
	}
};