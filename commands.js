const { REST, Routes } = require('discord.js');
require('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;
const TOKEN = process.env.TOKEN;
console.log(CLIENT_ID);
console.log(TOKEN);

//$play - youtube link
//$skip - skip the song
//$stop - stop the song
//$pause - pause the song
//$resume - resume the song
//$queue - show the queue
//$loop - loop the song
//$lyrics - show the lyrics of the song
const commands = [
    {
        name: 'play',
        description: 'Play a song',
        options: [
            {
                name: 'song',
                description: 'The song you want to play',
                type: 3,
                required: true,
            },
        ],
    },
    {
        name: 'skip',
        description: 'Skip the song',
    },
    {
        name: 'stop',
        description: 'Stop the song',
    },
    {
        name: 'pause',
        description: 'Pause the song',
    },
    {
        name: 'resume',
        description: 'Resume the song',
    },
    {
        name: 'queue',
        description: 'Show the queue',
    },
    {
        name: 'loop',
        description: 'Loop the song',
    },
    {
        name: 'lyrics',
        description: 'Show the lyrics of the song',
    }
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

module.exports = commands;