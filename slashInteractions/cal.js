 const {
	SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
	name: "çal",
	command: new SlashCommandBuilder().setName("çal").setDescription("Bir müzik çal.").addStringOption(o => o.setName("müzik").setDescription("Bir Müzik ismi/linki veya Playlist linki gir.").setRequired(true)),
	async run(client, int, player, embed) {

		let name = int.options.getString("müzik");

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
		})

let emb1 = embed(int.guild, int.member.user);
    
  if (!track) {emb1 = emb1.setDescription(`**${name}** Bu isimde bir şarkı bulamadım!`); 
  await int.reply({
			embeds: [emb1],
      ephemeral: true
		});}

if (!track.playlist) {

		let emb = embed(int.guild, int.member.user);
   track = track.tracks
    
		
		emb = emb.setTitle("➕ Şarkı Eklendi ➕").addField("İsim", `[${track[0].title}](${track[0].url})`, true).addField("Yayınlayan", `${track[0].author}`, true).addField("İzlenme", `${track[0].views}`, true).addField("Süre", `${track[0].duration}`, true).setImage(`${track[0].thumbnail}`);
   await int.reply({
			embeds: [emb]
		});
		queue.addTrack(track[0]);}
    else if (track.playlist) {		let emb = embed(int.guild, int.member.user);

    //let parça = track.playlist.tracks.filter((muzik) => muzik.url.includes("track")).map((muzik) => {return (song = {
         // title: muzik.title,
         // url: muzik.url,
         // duration: muzik.duration,
          //thumbnail: muzik.thumbnail,
          //author: muzik.author
        //});})
                              
		//console.log(parça)
		emb = emb.setTitle("➕ Playlist Eklendi ➕").addField("İsim", `[${track.playlist.title}](${track.playlist.url})`, true).addField("Sahibi", `[${track.playlist.author.name}](${track.playlist.author.url})`, true).addField("Türü", `${track.playlist.source}`, true).addField("Şarkılar", `${track.playlist.tracks.length}`, true).setImage(`${track.playlist.thumbnail}`);
     await int.reply({
		embeds: [emb]
		});
		queue.addTracks(track.playlist.tracks)}

    if (!queue.playing) return queue.play()
    
		

	}
};