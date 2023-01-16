const { SlashCommandBuilder } = require("discord.js");
const { Donate } = require("../messages");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("donate")
    .setDescription("Support The-Nominator"),
  async execute(interaction, db) {
    return interaction.reply(Donate());
  },
};
