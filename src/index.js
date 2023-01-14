const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const axios = require("axios");
const { botToken } = require("./config.json");
const SERVICE_ACCOUNT = require("./serviceAccount.json");
const { ConfigCommands } = require("./deploy-commands");
const { VerifyRedeem } = require("./messages");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", async (interaction) => {
  console.log("Bot is online");
  client.guilds.cache.map(async (guild) => {
    await ConfigCommands(guild.id);
  });
});

client.on("guildCreate", async (guild) => {
  console.log(`Role-ify has joined guild ${guild.id}`);
  await ConfigCommands(guild.id);
});

client.commands = new Collection();
//import commands first
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

//HANDLING SLASH COMMANDS
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const commandName = interaction.commandName;
  const command = interaction.client.commands.get(commandName);

  if (!command) {
    console.error(`No command matching ${commandName} was found.`);
    return;
  }
  try {
    if (
      interaction.member
        .permissionsIn(interaction.channel)
        .has("ManageRoles") ||
      commandName === "help" ||
      commandName === "revoke"
    )
      await command.execute(interaction, db);
    else
      return interaction.reply({
        content: "You don't have permission to use this command",
        ephemeral: true,
      });
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});
client.login(botToken);

//verify server subscription every 12 hours
