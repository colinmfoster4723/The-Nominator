const { EmbedBuilder } = require("@discordjs/builders");

module.exports = {
  HelpMessage() {
    return {
      content: "",
      embeds: [
        new EmbedBuilder()
          .setColor(0xe3971e)
          .setTitle("Guide:")
          .setDescription(
            "*Here is a list of all of the commands:* \n \n **/help** : list all commands \n **/timer** : set the amount of time until a user is nominated (default = 60 seconds) \n **/ceremony** : allow the-nominator to join the voice channel you are currently in.\n **/end** : End the ceremony and disconnect The-Nominator\n **/whitelist** : add/remove Nominator Whitelist role to user, whitelisted users cannot be nominated by The Nominator\n**/donate** : Learn how you can support The-Nominator\n\n*The-Nominator will start playing music if a member speaks longer than the timer. If a member has spoken for more than 3 seconds their timer is reset"
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
  Donate() {
    return {
      content: "",
      embeds: [
        new EmbedBuilder()
          .setColor(0x8b3dd9)
          .setTitle(`Support The-Nominator v0.1.0!`)
          .setDescription(
            "***If you'd like to support this project and future updates :***\n\n>>> - donate ETH or other tokens to 0x80581C6e88Ce00095F85cdf24bB760f16d6eC0D6\n\n - follow me on twitter => https://twitter.com/namedotget\n\n *please dm me on twitter if you have any questions, comments or concerns, thanks for using The-Nominator! 😄*"
          ),
      ],
    };
  },
};
