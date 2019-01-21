import Discord from 'discord.js';

export type Message = {
	message: string;
	author: {
		id: string;
		isBot: boolean;
	};
	member?: {
		voice?: {
			channel: {
				join: () => Promise<Discord.VoiceConnection>;
			};
		};
	};
	channel?: {
		send: (content: any) => void;
	};
	reply: (msg: string) => void;
	delete: () => void;
};
