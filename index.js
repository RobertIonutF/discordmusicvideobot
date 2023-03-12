const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers
] });
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
require('dotenv').config();
const TOKEN = process.env.TOKEN;
const ytdl = require('ytdl-core');

client.on('ready', () => {
    // Type in console when bot is ready
    console.log('Bot is ready!');
});

client.on('interactionCreate', async interaction => {
    // If the interaction is not a command, return 
    if (!interaction.isCommand()) return;
    // If the command is play:
    // we need to play the url that the user sent
    if (interaction.commandName === 'play') {
        // Get the url from the interaction
        const url = interaction.options.get('song').value;
        // Send a message to the channel
        interaction.reply(`Playing ${url}`);

        // Join the voice channel
        const channel = interaction.member.voice.channel;

        // If the user is not in a voice channel, return
        if (!channel) {
            return interaction.reply('You need to be in a voice channel!');
        }

        // Create an audio player
        const player = createAudioPlayer();
        //Create the stream
        const stream = ytdl(url, { filter: 'audioonly' });
        // Create the audio resource
        const resource = createAudioResource(stream, { inputType: stream.format });

        // Join the voice channel
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        player.play(resource);
        connection.subscribe(player);

        player.on("idle", () => {
            interaction.channel.send("Song has ended");
            connection.destroy();
        });
    }
});

client.login(TOKEN);