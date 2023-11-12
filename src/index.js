// Run bot by using 'nodemon' in terminal

// Require dotenv file
require('dotenv').config(); //Gives access to the env file from anywhere in our code base

// Import needed class items from discord.js
    // Client refers to the bot we make
    // Intents handles the permissions needed by the bot
    // EmbedBuilder is for building embeds
    // ActivityType is to set custom activity types for bot status
const { Client, IntentsBitField, EmbedBuilder, ActivityType } = require('discord.js');

// Import event handler
const eventHandler = require('./handlers/eventHandler');

// Create new client (as the bot)
const client = new Client ({
    intents: [
        // Intents are a set of permissions that the bot can use to get access to a set of events
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

// Set up for making bot change status every couple of seconds
let status = [
    // Takes an object of all possible status we'd like our bot to show
    {
        name: 'Generating numbers',
        type: ActivityType.Custom
    },
    {
        name: 'Dustland Runner',
        type: ActivityType.Streaming,
        url: 'https://www.youtube.com/watch?v=rbyfCWLnWK4&t=3s'
    },
    {
        name: 'Dustland Runner',
        type: ActivityType.Playing
    }
]

// Event handler function
eventHandler(client);

// Add login method to client using token on Discord developer page
client.login(process.env.TOKEN); //Access the token from the dotenv file

// Event listener to log to console whenever but turns on
client.on('ready', (c) => {
    console.log(`✔️  ${c.user.username} is online.`);

    // Set interval time for changing bot activity status
    setInterval(() => {
        // random var will generate random index based on length of our status array
        let random = Math.floor(Math.random() * status.length);

        // Set bot activity based on that index
        client.user.setActivity(status[random]);

    }, 10000); //In miliseconds, so it's 10 seconds

    // Set bot activity status
    /* Obsolete, check 'status' array above
    client.user.setActivity({
        name: 'Generating numbers to guess',
        type: ActivityType.Streaming,
        url: 'https://www.youtube.com/watch?v=OqxHy8sCtvA&list=PLpmb-7WxPhe0ZVpH9pxT5MtC4heqej8Es&index=6', //Takes youtube/twitch
    })*/
});

// Obsolete event listeners moved to eventHandler.js
// // Event listener to listen to new messages sent
// client.on('messageCreate', (msg) => {
//     console.log(msg.content); //Check message in documentation to see what properties and methods a message can have

//     // Teach bot how to distinguish message from human or bot
//     if (msg.author.bot) { //If message author property has bot property set to true
//         return;
//     }

//     // Check message content for hello
//     if (msg.content === 'hello') {
//         msg.reply('Hey!');
//     }
// });

// // Deal with interactions, event listener for slash interactions
// client.on('interactionCreate', (interaction) => { //Returns an interaction
//     if (!interaction.isChatInputCommand()) return; //Code below this will only run if the interaction was slash command

//     console.log(interaction.commandName);

//     // Check interaction for 'hey'
//     if (interaction.commandName === 'hey') {
//         interaction.reply('Hello!');
//     }

//     // Check interaction for 'ping'
//     if (interaction.commandName === 'ping') {
//         interaction.reply('Pong!');
//     }

//     // Listen for 'add' command
//     if (interaction.commandName === 'add') {
//         // Gets the options property from 'first-number' object using get method
//         const num1 = interaction.options.get('first-number').value;
//         const num2 = interaction.options.get('second-number').value;
        
//         // Reply with sum
//         interaction.reply(`The sum is ${num1 + num2}`);
//     }

//     // Listen for 'embed' command
//     if (interaction.commandName === 'embed') {
//         const embed = new EmbedBuilder()
//             .setTitle('Embed title')
//             .setDescription('This is an embed description')
//             .setColor(0xff5c01)
//             .addFields({ 
//                 name: 'Field title', 
//                 value: 'Random value', 
//                 inline: true 
//             });
        
//         interaction.reply({ embeds: [embed] });
//     }
// });

// // Event listener to send embed as message reply
// client.on('messageCreate', (message) => {
//     if (message.content === 'embed') {
//         const embed = new EmbedBuilder()
//             .setTitle('Embed title')
//             .setDescription('This is an embed description')
//             .setColor(0xff5c01)
//             .addFields({ 
//                 name: 'Field title', 
//                 value: 'Random value', 
//                 inline: true 
//             });
        
//         message.channel.send({ embeds: [embed] });
//     }
// });

// // Add logic to add role button (interaction event listener)
// client.on('interactionCreate', async (interaction) => {
//     try {
//     // Check if interaction was from a button
//     if (!interaction.isButton()) { 
//         return;
//     }

//     // Check if role exists in the server
//     await interaction.deferReply({ ephemeral: true }); //Gives users the message that the bot is thinking
//         // Async is needed in the client.on method if we use await
//         //ephemeral: true makes it so only the person running the interaction can see this

//     // Get role that was associated with the button
//     const role = interaction.guild.roles.cache.get(interaction.customId);

//     // Check if role exists in the server
//     if (!role) {
//         interaction.editReply({
//             content: 'Role not found in the server',
//         })
//         return;
//     }

//     // Check if person running interaction has role or not
//     const hasRole = interaction.member.roles.cache.has(role.id);

//     // Run code if person has the roles (remove role)
//     if (hasRole) {
//         await interaction.member.roles.remove(role);
//         await interaction.editReply(`The role ${role} has been removed`);
//         return;
//     }

//     // Run code if person doesn't have the role (add role)
//     await interaction.member.roles.add(role);
//     await interaction.editReply(`The role ${role} has been added`);
        
//     } catch (error) {
//         console.log(error);
//     } 
// });

// Install dotenv in terminal to setup environment variables
// Code .env in source directory

// To implement commands, code register-commands.js in src/
    // This is temporary before adding a command handler