import { Observable } from 'rxjs';
import { Message } from './Message/Message';
import { MessageCommandData } from './Message/MessageCommandData';
import { Command } from './Command/Command';

export type MessageParser = (
	message: Message,
	cmd: Command
) => Observable<MessageCommandData>;
