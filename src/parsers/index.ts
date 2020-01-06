import { from } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { Message } from '../../lib/Message/Message';
import { Command } from '../../lib/Command/Command';

export type SpaceMessageParserArguments = {
	aliases: string[];
	maxArguments?: number;
};

export const spaceMessageParser = ({
	aliases,
	maxArguments = 32
}: SpaceMessageParserArguments) => (msg: Message, command: Command) => from(aliases).pipe(
	filter(
		(cmdName) =>
			msg.message === cmdName || msg.message.startsWith(`${cmdName} `)
	),
	map(() => msg.message.split(' ', maxArguments)),
	map(([_, ...parameters]) => ({
		message: msg,
		parameters,
		command
	})),
	take(1)
);
