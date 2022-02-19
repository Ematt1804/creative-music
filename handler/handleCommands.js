const { ApplicationCommandPermissionTypes } = require("discord.js/typings/enums");

const guildId = '944076898965798942'

module.exports = (client) => {
    client.handleCommands = async (SlashCommands, path) => {
        client.commandArray = [];
        for (folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filer(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
            }
        }
        const rest = new REST ({
            version: '9'
        }).setToken(process.env.token);

        (async () => {
            try {
                console.log('Started refreshing application (/) commands.');

                await rest.put(
                    Routes.applicationGuildCommands(cliendID, guildId), {
                        body: client.commandArray
                    },
                );

                console.log('Successfuly reloaded application (/) commands');
            } catch (error) {
                console.error(error);
            }
        })();
        };
    };