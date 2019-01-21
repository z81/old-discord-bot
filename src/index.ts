import { mocksRandomCommandMessages$ } from '../mock';
import '../lib';
import { config } from 'dotenv';
import { connectWith } from '../lib';
config();

const { DISCORD_TOKEN = '' } = process.env;

connectWith({
	discordToken: DISCORD_TOKEN
});

// mocksRandomCommandMessages$.subscribe(message$.next.bind(message$));
