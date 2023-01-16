const { SlashCommandBuilder } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("end")
    .setDescription("End a ceremony and disconnect The-Nominator"),
  async execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel)
      return interaction.reply({
        content: "You are not in a voice channel!",
        ephemeral: true,
      });

    const connection = getVoiceConnection(interaction.channel.guild.id);
    if (!connection)
      return interaction.reply({
        content:
          "The-Nominator is not in this channel or a cermony hasn't been started",
        ephemeral: true,
      });

    connection.destroy();
    interaction.reply({ content: "The ceremony has ended", ephemeral: true });
  },
};
