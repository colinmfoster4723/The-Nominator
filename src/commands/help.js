const { SlashCommandBuilder } = require("discord.js");
const { HelpMessage } = require("../messages");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("List all of the commands"),
  async execute(interaction, db) {
    return interaction.reply(HelpMessage());
  },
};
