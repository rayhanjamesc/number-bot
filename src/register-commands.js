// Update commands with CLI (node src/register-commands.js)

// Deal with slash command registrations (adding and updating commands)

// Access server ID and bot's ID and add it to env file

// Get access to our environment variables
require('dotenv').config();

// Import items from discord.js library
    // REST is for setting token
    // ApplicationCommandOptionType is to be able to add a type
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js')

// Define commands as an array of objects (each object represents a single command)
const commands = [
    // Guess number command
    { name:'guess-number',
        description: 'Guess a number the bot is thinking',
        options: [
            {
                name: 'difficulty-level',
                description: 'Choose the level of difficulty from one to ten',
                type: ApplicationCommandOptionType.Number,
                choices: [
                    {
                        name: '1-10',
                        value: 1,
                        type: ApplicationCommandOptionType.Number
                    },
                    {
                        name: '1-20',
                        value: 2,
                        type: ApplicationCommandOptionType.Number
                    },
                    {
                        name: '1-30',
                        value: 3,
                        type: ApplicationCommandOptionType.Number
                    },
                    {
                        name: '1-40',
                        value: 4,
                        type: ApplicationCommandOptionType.Number
                    },
                    {
                        name: '1-50',
                        value: 5,
                        type: ApplicationCommandOptionType.Number
                    },
                    {
                        name: '1-60',
                        value: 6,
                        type: ApplicationCommandOptionType.Number
                    },
                    {
                        name: '1-70',
                        value: 7,
                        type: ApplicationCommandOptionType.Number
                    },
                    {
                        name: '1-80',
                        value: 8,
                        type: ApplicationCommandOptionType.Number
                    },
                    {
                        name: '1-90',
                        value: 9,
                        type: ApplicationCommandOptionType.Number
                    },
                    {
                        name: '1-100',
                        value: 10,
                        type: ApplicationCommandOptionType.Number
                    }
                ]
            }
        ]
    },

    {
        name: 'hey',
        description: 'Replies with hey!',
    },
    {
        name: 'ping',
        description: 'Pong!',
    },

    // Embed command
    {
        name: 'embed',
        description: 'Check out our bot guide on Medium!',
    },

    // Add commands with options
    {
        name: 'add',
        description: 'Adds two numbers.',
        options: [
            {
                name: 'first-number',
                description: 'The first number.',
                type: ApplicationCommandOptionType.Number,
                choices: [
                    {
                        name: 'one',
                        value: 1,
                    },
                    {
                        name: 'two',
                        value: 2,
                    },
                    {
                        name: 'three',
                        value: 3,
                    },
                ],
                required: true,
            },
            {
                name: 'second-number',
                description: 'The second number',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ],
    },
];

// Make use of REST to register commands in the async function, inside the try block
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN); //Take version 10 and then set the token

// Function that will register the slash commands (an async anonymous function)
(async () => {
    try { //Try and catch block, runs some code and if error occurs it's going to catch it and deal with error
        console.log('Registering slash commands...');

        //Register commands inside the try block
        await rest.put( //Put method takes 2 arguments
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), //Need applicationId(bot id) and guildId
            { body: commands } //"body" takes the "commands" variable (array of objects) above
        )

        console.log('Slash commands registered successfully!');

    } catch (error) { //We can deal with the error however we like
        console.log(`There was an error: ${error}`)
    }
})();