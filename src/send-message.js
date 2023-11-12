// This file is responsible for sending the initial message with role buttons
// Run with node src/send-message.js

require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client ({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

// Defines roles needed to be added to the button
const roles = [
    {
        id: '1166583862189621248',
        label: 'Join Number Guess Event'
    }
]

client.on('ready', async (c) => {
    console.log(`✔️  ${c.user.username} is online.`);

    // Try catch block to check for errors
    try {
        // Get channel where we want to send the message
        const channel = await client.channels.cache.get('1165870551684894801') //Get id of channel to send message

        // Checks if channel exists
        if (!channel) return;

        // Define row of buttons that's going into the message
        const row = new ActionRowBuilder();

        // Loop through all roles and push it to ActionRowBuilder
        roles.forEach((role) => {
            // Pushes a component to "row" for each role we have
            row.components.push(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
            )
        })

        // Send message into a channel
        await channel.send({
            content: 'Claim or remove the number guesser role',
            components: [row] //Each row can take a max of 5 buttons or roles
        });

        // Once message is sent, exit out of this file
        process.exit();

    } catch (error) {
        console.log(error);
    }
});

client.login(process.env.TOKEN);