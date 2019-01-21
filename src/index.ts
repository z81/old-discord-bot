import { mocksRandomCommandMessages$ } from '../mock';
import '../lib';
import 'dotenv';
import { connectWith } from '../lib';

const { DISCORD_TOKEN = '' } = process.env;

connectWith({
	discordToken: DISCORD_TOKEN
});

// mocksRandomCommandMessages$.subscribe(message$.next.bind(message$));
