import { MessageCommandData } from '../../lib/Message/MessageCommandData';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

export const isLow = () => (msg: MessageCommandData) =>
	of(+msg.message.author.id > 500).pipe(
		tap((isAllowed) => {
			if (!isAllowed) {
				msg.message.reply('id is lower');
			}
		})
	);
