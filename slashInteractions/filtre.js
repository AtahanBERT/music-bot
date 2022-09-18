const {
	SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
	name: "filtre",
	command: new SlashCommandBuilder().setName("filtre").setDescription("Şarkı filtresi seçersiniz.").addStringOption(o => o.setRequired(true).setName("filter").setDescription("filtre").addChoices({name:"Filtreleri temizle", value:"cleanFilters"}).addChoices({name:"Yüksek Bassboost", value:"bassboost_high"}).addChoices({name:"Bassboost", value:"bassboost"}).addChoices({name:"Düşük Bassboost", value:"bassboost_low"}).addChoices({name:"8D", value:"8D"}).addChoices({name:"Vaporwave", value:"vaporwave"}).addChoices({name:"Nightcore", value:"nightcore"}).addChoices({name:"Reverse", value:"reverse"}).addChoices({name:"Earrape", value:"earrape"}).addChoices({name:"Chorus", value:"chorus"}).addChoices({name:"Chorus2D", value:"chorus2d"}).addChoices({name:"Chorus3D", value:"chorus3d"}).addChoices({name:"Vibrato", value:"vibrato"}).addChoices({name:"Subboost", value:"subboost"}).addChoices({name:"Normalizer", value:"normalizer"}).addChoices({name:"Mono", value:"mono"}).addChoices({name:"Softlimiter", value:"softlimiter"}).addChoices({name:"Treble", value:"treble"}).addChoices({name:"Pulsator", value:"pulsator"})),
	async run(client, int, player, embed) {

		let queue = player.createQueue(int.guild, {
			metadata: {
				channel: int.channel
			}
		});

		let filter = int.options.getString("filter");
		let filters = {
      bassboost_high: false,
			bassboost: false,
      bassboost_low: false,
			"8D": false,
			vaporwave: false,
			nightcore: false,
			reverse: false,
      earrape: false,
      chorus: false,
      chrous2d: false,
      chorus3d: false,
      vibrato: false,
      subboost: false,
      normalizer: false,
      mono: false,
      softlimiter: false,
      treble: false,
      pulsator: false
		};
		let enabledFilters = queue.getFiltersEnabled();
		let text;

		if (filter == "cleanFilters") {

			text = `Bütün filtreleri temizledim!`

			for (let f of enabledFilters) {
				filters[f] = false;
			};

		} else {

			text = `**${filter}** adlı filtreyi açtım!`;

			for (let f of enabledFilters) {
				filters[f] = true;
			};

			filters[filter] = true;

		};

		queue.setFilters(filters);


		return await int.reply({
			embeds: [embed(int.guild, int.member.user).setDescription(`${text}`)]
		});

	}
};