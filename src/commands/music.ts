import { makeCommand } from '../../lib/Command/makeCommand';
import { spaceMessageParser } from '../parsers';
import Discord, { TextChannel, RichEmbed } from 'discord.js';
import ytdl from 'ytdl-core';
import { Message } from '../../lib/Message/Message';
import { Readable } from 'stream';

type Video = {
	url: string;
	title: string;
	thumbnail: string;
	length: string;
};

type Store = {
	queue: Video[];
};

export const music = () => {
	const store: Store = {
		queue: []
	};

	let ytStream: Readable;
	let connection: Discord.VoiceConnection;
	let isPlaying = false;

	const findTextChannel = (name: string) =>
		connection.channel.guild.channels.find(
			(c) => c.name === name && c.type === 'text'
		) as TextChannel;

	const play = () => {
		if (store.queue.length === 0) return;

		const video = store.queue.shift();
		ytStream = ytdl(video!.url, {
			filter: 'audioonly'
		});

		if (ytStream) {
			ytStream.on('end', () => {
				isPlaying = false;
				play();
			});

			connection.playStream(ytStream);

			const offtop = findTextChannel('off-topic');
			const general = findTextChannel('general');

			const embed = new RichEmbed()
				.setTitle('🎶 Playing')
				.setColor('RANDOM')
				.setThumbnail(video!.thumbnail)
				.setDescription(
					`**Song:** ${video!.title}\n**Duration:** ${video!.length}`
				);
			(offtop || general).send({ embed });

			isPlaying = true;
		}
	};

	const queueAdd = ({ url, title, length, thumbnail }: Video) => {
		store.queue.push({ url, title, length, thumbnail });

		if (store.queue.length === 1 && !isPlaying) {
			play();
		}
	};

	const join = async (message: Message) => {
		connection = await message.member!.voice!.channel.join();
	};

	const skip = async () => {
		isPlaying = false;
		play();
	};

	const playCmd = async (message: Message, parameters: string[]) => {
		await join(message);

		if (parameters.length < 2)
			return void message.reply('Недостаточно параметров!');

		const url = parameters[1];
		const isValid = await ytdl.validateURL(url);

		if (!isValid) return void message.reply('Неверный url!');

		const { title, length_seconds, thumbnail_url } = await ytdl.getInfo(
			url
		);

		if (+length_seconds > 10 * 60) {
			return void message.reply(`Слишком длинное видео!`);
		}

		message.channel!.send(`**Добавлен в очередь:** ${title}`);

		queueAdd({
			title,
			url,
			length: `${Math.floor(+length_seconds / 60)}:${+length_seconds %
				60}`,
			thumbnail: thumbnail_url
		});
	};

	return makeCommand({
		messageParser: spaceMessageParser({
			aliases: [ '$yt' ]
		}),
		execute: async ({ message, parameters }) => {
			switch (parameters[0]) {
				case 'play':
					playCmd(message, parameters);
					break;

				case 'skip':
					skip();
					break;

				case 'join':
					await join(message);
					break;

				case 'leave':
					connection!.channel!.leave();
					break;
			}
		}
	});
};
