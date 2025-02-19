const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

// تحميل الأوامر المُعدّلة لكل سيرفر من ملف commands.json إن وُجد
let customCommands = {};
const commandsFile = './commands.json';
if (fs.existsSync(commandsFile)) {
    customCommands = JSON.parse(fs.readFileSync(commandsFile));
}

client.on('message', message => {
    // تجاهل الرسائل من البوتات أو الرسائل في الخاص
    if (message.author.bot || !message.guild) return;

    if (message.content === '$hi') {
        const serverId = message.guild.id;
        // افتراضي الرد هو "hi"، وإن وُجد رد مخصص للسيرفر نستخدمه
        let reply = "hi";
        if (customCommands[serverId] && customCommands[serverId]['$hi']) {
            reply = customCommands[serverId]['$hi'];
        }
        message.channel.send(reply);
    }
});

// مثال لدالة تحديث الأمر للسيرفر (يمكن استدعاؤها من خادم الويب)
function updateCommand(serverId, command, newReply) {
    if (!customCommands[serverId]) customCommands[serverId] = {};
    customCommands[serverId][command] = newReply;
    // حفظ التعديلات في ملف JSON
    fs.writeFileSync(commandsFile, JSON.stringify(customCommands, null, 2));
}

// تسجيل دخول البوت (استبدل YOUR_BOT_TOKEN بالتوكن الخاص بك)
client.login('MTMxMjgzMDU5OTYyMjQzMDcyMA.G0Faof.QjPS2WxRiZZX_rZ4C2gAXj3Jt1Fk0Dd49h0wKA');
