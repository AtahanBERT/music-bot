module.exports = {
	customId: "bduraklat",
	async run(client, int, player, embed) {

  	let queue = player.getQueue(int.guild, {
			metadata: {
				channel: int.channel
			}
		});
    
if(queue.setPaused() === true) {
     queue.setPaused(false)
     await int.reply({
			embeds: [embed(int.guild, int.member.user).setTitle("Devam ediyor!").setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtfiF5MbtzvGFNBBQsSXDdsYW4noepo2NU7E4K8mm4rOApY-EVQqnZ8TqYLhGPalh5Nb4&usqp=CAU")]
		});    
    } else {
      queue.setPaused(true)
      await int.reply({
			embeds: [embed(int.guild, int.member.user).setTitle("Durduruldu!").setThumbnail("https://cdn2.iconfinder.com/data/icons/control-button/64/pause-resume-button-interface-512.png")]
		});   
    }
    
	}
};