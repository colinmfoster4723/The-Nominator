const { SlashCommandBuilder } = require("discord.js");
const { HelpMessage, Nomination } = require("../messages");
const voice = require("@discordjs/voice");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("join")
    .setDescription(
      "Allow The-Nominator to join the voice-channel you're currently in"
    ),
  async execute(interaction) {
    if (interaction.guild.members.cache.get(interaction.user.id) === null)
      return;
    const voiceChannel = interaction.member.voice.channel;
    console.log(interaction.member);
    if (!voiceChannel)
      return interaction.reply({
        content: "Please join a voice-channel and try again",
        ephemeral: true,
      });
    let connection = voice.joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      selfDeaf: false,
      selfMute: true,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    interaction.reply({
      content: "The-Nominator has successfully joined the voice-channel",
    });

    const speakers = {};

    connection.receiver.speaking.on("start", (userId) => {
      //check if timer is older than 5 min
      //if its been mroe than 10 seconds since last start, clear timer
      if (speakers[userId]) {
        const now = Date.now();
        if ((now - speakers[userId]) / 1000 >= 300) {
          /////play music
        }
      } else speakers[userId] = Date.now();

      console.log(speakers);
    });
  },
};
