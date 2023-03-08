const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("whitelist")
    .setDescription("Temporarily whitelist a member")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("select a user you'd like to temporarily whitelist")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { guild, options } = interaction;
    const user = options.getUser("user");
    const timer = Math.floor(options.getNumber("timer"));

    if (timer < 0 || timer > 60)
      return interaction.reply({
        content: "Time cannot be less than 1 minute or greater than 60 minutes",
        ephemeral: true,
      });

    //check for whitelist role if not create one
    let whitelistRole = await guild.roles.cache.find(
      (r) => r.name === "Nominator-Whitelist"
    );

    if (!whitelistRole) {
      whitelistRole = await guild.roles.create({
        name: "Nominator-Whitelist",
        color: "#ffffff",
        reason: "members with this role cannot be nominated by The-Nominator",
      });
    }

    const member = await guild.members.cache.find((m) => m.id === user.id);

    const memberIsWhitelisted = member.roles.cache.some(
      (r) => r.name === "Nominator-Whitelist"
    );

    if (memberIsWhitelisted) {
      await member.roles.remove(whitelistRole);
      interaction.reply(
        `${user.username} has been removed from the Nominator Whitelist`
      );
    } else {
      await member.roles.add(whitelistRole);
      interaction.reply(
        `${user.username} has been whitelisted from the Nominator`
      );
    }
  },
};
