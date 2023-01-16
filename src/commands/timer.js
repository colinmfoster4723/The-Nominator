const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timer")
    .setDescription(
      "Set the amount of time until a user is nominated for speaking"
    )
    .addNumberOption((option) =>
      option
        .setName("timer")
        .setDescription(
          "seconds until user is nominated (default = 60 seconds)"
        )
        .setRequired(true)
    ),
  async execute(interaction, db) {
    const { options, guild } = interaction;
    const timer = Math.floor(options.getNumber("timer"));
    if (timer < 30 || timer > 300)
      return interaction.reply({
        content:
          "Timer cannot be less than 30 seconds or greater than 5 minutes (300 seconds)",
        ephemeral: true,
      });
    const guildRef = db.collection("The-Nominator").doc(guild.id);

    guildRef.set(
      {
        timer,
      },
      { merge: true }
    );
    return interaction.reply({
      content: `*Thanks ${interaction.user.username}, members will now be nominated if they speak for more than ${timer} seconds*`,
    });
  },
};
