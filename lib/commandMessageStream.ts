import { Observable } from 'rxjs';
import { filter, flatMap, every, mapTo } from 'rxjs/operators';
import { message$ } from './messageStream';
import { commands$ } from '../src/commands';

export const commandMessage$ = message$.pipe(
	filter((msg) => !msg.author.isBot),
	flatMap((message) =>
		commands$.pipe(flatMap((cmd) => cmd.messageParser(message, cmd)))
	),
	flatMap((msg) =>
		msg.command.guards$.pipe(
			flatMap((guard) => guard(msg)),
			every((isAllowed) => isAllowed),
			filter((isAllAllowed) => isAllAllowed),
			mapTo(msg)
		)
	)
);
