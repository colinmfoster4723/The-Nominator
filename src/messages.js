const {
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
} = require("@discordjs/builders");
const { ButtonStyle } = require("discord.js");

module.exports = {
  HelpMessage() {
    return {
      content: "",
      embeds: [
        new EmbedBuilder()
          .setColor(0x25b5cf)
          .setTitle("Guide:")
          .setDescription(
            "***The-Nominator*** will start playing music from the Oscars if a member has been talking for more than 5 minutes.  The member will receive a nomination in the chat!"
          ),
      ],
      ephemeral: true,
    };
  },
  Nomination(username) {
    return {
      content: "",
      embeds: [
        new EmbedBuilder()
          .setColor(0xf5c842)
          .setTitle(`Congratulations ${username}!`)
          .setDescription("You have been Nominated! 🎉🏆🎉"),
      ],
    };
  },
};
