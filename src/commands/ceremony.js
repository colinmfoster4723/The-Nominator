const { SlashCommandBuilder } = require("discord.js");
const { Nomination } = require("../messages");
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  NoSubscriberBehavior,
  StreamType,
} = require("@discordjs/voice");
const { createReadStream } = require("node:fs");
const { join } = require("node:path");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ceremony")
    .setDescription(
      "Start a ceremony and allow The-Nominator to join the voice-channel you're currently in"
    ),
  async execute(interaction, db) {
    const { guild } = interaction;
    if (guild.members.cache.get(interaction.user.id) === null) return;

    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel)
      return interaction.reply({
        content: "Please join a voice-channel and try again",
        ephemeral: true,
      });
    let connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      selfDeaf: false,
      selfMute: false,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    interaction.reply({
      content: "The-Nominator has successfully joined the voice-channel",
    });

    const guildRef = db.collection("The-Nominator").doc(guild.id);
    const guildData = await guildRef.get();
    let timer;
    guildData && guildData._fieldsProto.timer
      ? (timer = guildData._fieldsProto.timer.integerValue)
      : 60;

    const speakers = {};

    connection.receiver.speaking.on("start", async (userId) => {
      if (speakers[userId]) {
        const now = Date.now();
        //Check if user last spoke, less than 3 seconds ago
        if ((now - speakers[userId].end) / 1000 <= 3) {
          console.log(
            `less than 3 seconds since ${interaction.user.username} last spoke`
          );
        } else speakers[userId].start = now;
        //Check if the user has been speaking for longer than the timer
        if ((now - speakers[userId].start) / 1000 >= timer) {
          const player = createAudioPlayer({
            behaviors: {
              noSubscriber: NoSubscriberBehavior.Pause,
            },
          });
          const resource = createAudioResource(
            createReadStream("src/awards.ogg", {
              inputType: StreamType.OggOpus,
            })
          );
          player.on("error", (error) => console.log(error));
          connection.subscribe(player);
          player.play(resource);
          console.log(`${interaction.user.username} has been Nominated!`);
          speakers[userId] = false;
          voiceChannel.send(Nomination(interaction.user.username));
          setTimeout(() => {
            player.stop();
          }, 15000);
        }
      } else speakers[userId] = { start: Date.now(), end: 0 };
      console.log(speakers);
    });

    connection.receiver.speaking.on("end", (userId) => {
      if (speakers[userId]) speakers[userId].end = Date.now();
      console.log(speakers);
    });
  },
};
