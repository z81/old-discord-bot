import { Config } from './Config';
import { commandMessage$ } from './commandMessageStream';
import { creteDiscordStream } from './sources/creteDiscordStream';

export const connectWith = (config: Config) => {
	if (config.discordToken === '') {
		console.error('pls set ENVIRONMENT variables');
	}

	if (config.discordToken) {
		creteDiscordStream(config.discordToken);
	}
};

commandMessage$.subscribe((msgData) => {
	msgData.command.execute(msgData);
});
