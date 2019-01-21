import { timer } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import _ from 'lodash';

const commandMessages = [
	'!calc',
	'!test a b c',
	'!cho',
	'adfdf',
	'!count',
	'a v c'
];

export const mocksRandomCommandMessages$ = timer(0, 1000).pipe(
	map(() => _.sample(commandMessages)),
	map((message = '') => ({
		message,
		author: {
			isBot: Math.random() < 0.5,
			id: `${Math.round(Math.random() * 1000)}`
		},
		reply: (msg: string) => console.log('reply', msg)
	})),
	tap((m) => console.info(`[Send message]: ${JSON.stringify(m)}`))
);
