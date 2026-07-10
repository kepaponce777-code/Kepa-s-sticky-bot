require('dotenv').config();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// CONFIGURA TU MENSAJE STICKY
const stickyMessage = "📌**__Vouch format:__**\nVouch kepatronixx mmed [your item] for [their item]";
// CONFIGURA EL CANAL DONDE QUIERES EL STICKY
const stickyChannelId = "1517970139075711027";

let lastStickyId = null;

client.on("messageCreate", async (msg) => {
    if (msg.channel.id !== stickyChannelId) return;
    if (msg.author.bot) return;

    try {
        // Borra el sticky anterior si existe
        if (lastStickyId) {
            const oldSticky = await msg.channel.messages.fetch(lastStickyId).catch(() => null);
            if (oldSticky) oldSticky.delete().catch(() => {});
        }

        // Envía el nuevo sticky
        const newSticky = await msg.channel.send(stickyMessage);
        lastStickyId = newSticky.id;

    } catch (err) {
        console.error("Error con el sticky:", err);
    }
});

client.login(process.env.TOKEN);