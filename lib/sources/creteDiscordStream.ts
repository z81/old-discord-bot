import Discord from 'discord.js';
import { message$ } from '../messageStream';

export const creteDiscordStream = (token: string) => {
	const client = new Discord.Client();

	client.on('message', (msg) =>
		message$.next({
			message: msg.content,
			author: {
				id: msg.author.id,
				isBot: msg.author.bot
			},
			member: {
				voice: {
					channel: {
						join: () =>
							msg.member && msg.member.voiceChannel &&
							msg.member.voiceChannel.join()
					}
				}
			},
			reply: (text) => msg.reply(text),
			delete: () => msg.delete(),
			channel: {
				send: (content?: any) => msg.channel.send(content)
			}
		})
	);

	client.login(token);
};
