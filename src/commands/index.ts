import { makeCommand } from '../../lib/Command/makeCommand';
import { spaceMessageParser } from '../parsers';
import { from } from 'rxjs';
// import { music } from './music';

export const commands = [
	makeCommand({
		messageParser: spaceMessageParser({
			aliases: [ '$help' ],
			maxArguments: 1
		}),
		execute: (msgCmdData) => {
			msgCmdData.message.reply('!calc called');
		}
	})
];

export const commands$ = from(commands);
