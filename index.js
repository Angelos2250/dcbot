const { Client, GatewayIntentBits } = require('discord.js');
const schedule = require('node-schedule');
const {token} = require("./config.json")


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    schedule.scheduleJob('0 3 * * *', () => {
        const guild = client.guilds.cache.first();
        if (!guild) return;

        const voiceChannel = guild.channels.cache.find(channel => channel.type === 'GUILD_VOICE' && channel.name === 'General');
        if (!voiceChannel) return;

        voiceChannel.members.forEach(member => {
            member.voice.disconnect().catch(console.error);
        });

        console.log('All users have been disconnected from the General voice channel.');
    });
});

client.login(token);
