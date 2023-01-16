# The-Nominator v0.1.0
---
Introducing The-Nominator, your ultimate solution for managing voice chat on your Discord server! With this bot, you can easily set a timer for how long a person can speak before they are nominated. Once the timer runs out, a message will appear in the chat of the voice channel, and music will start playing to signify the end of their turn. Keep your voice chats organized and running smoothly with The-Nominator.

# Setup
---
To get started with The-Nominator, you will need to have admin privileges on the Discord server where you want to use the bot. Ensure that you give The-Nominator privledges to send messages and interact with voice channels.

1) Invite The-Nominator to your server [Invite The-Nominator](https://discord.com/api/oauth2/authorize?client_id=1063920584632832080&permissions=274927208704&scope=bot%20applications.commands)
2) Set a custom timer buy using the **/timer** command. The default timer is 60 seconds long.
3) Use the **/ceremony** command to allow The-Nominator to join the voice-channel you are in and start a ceremony.
4) Use the **/end** command when you want The-Nominator to leave the voice-channel

Once the The-Nominator bot has joined the voice-channel, it will monitor member's speaking statuses. If a member speaks for more than the configured time (30 second default) the user will be nominated.

# Commands
---
- **/timer** : Set the amount of time until a user is nominated for speaking (30 second default)
- **/ceremony** : Allow the bot to join the voice-channel you are currently in and start a ceremony
- **/end** : End the ceremony and disconnect The-Nominator
- **/donate** : Learn how you can support The-Nominator
- **/help** : Tutorial

# Gotchas
---
1) Make sure to reset the ceremony if you adjust the timer while a ceremony is active.