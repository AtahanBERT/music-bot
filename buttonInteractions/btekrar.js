module.exports = {
	customId: "btekrar",
	async run(client, int, player, embed) {

  	let queue = player.getQueue(int.guild, {
			metadata: {
				channel: int.channel
			}
		});
    
    let text;
    let text1;
    
		if(queue.repeatMode) {
			text = "Tekrarlama modunu kapattım!";
      text1 = "Kapalı"
			queue.setRepeatMode(0);
		}
		else {
			text = "Tekrarlama modunu açtım!";
      text1 = "Açık"
			queue.setRepeatMode(2);
		};

		

		await int.reply({
			embeds: [embed(int.guild, int.member.user).setTitle(`${text}`).setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcpUQquonuPTFmpnDQMMWl4rm8npwTyeHgcA&usqp=CAU")]
		});

let track = queue.nowPlaying()
  
  int.message.edit({embeds: [embed(int.guild, int.member.user).setTitle("🎶 Çalıyor 🎶").addField("İsim", `[${track.title}](${track.url})`, true).addField("Yayınlayan", `${track.author}`, true).addField("İzlenme", `${track.views}`, true).addField("Süre", `${track.duration}`, true).addField("Ekleyen", `${track.requestedBy}`, true).addField("Tekrar Modu", `${text1}`, true).setImage(`${track.thumbnail}`)]})  
	}
};