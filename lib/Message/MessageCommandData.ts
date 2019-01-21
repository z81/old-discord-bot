import { Message } from './Message';
import { Command } from '../Command/Command';

export type MessageCommandData = {
	message: Message;
	command: Command;
	parameters: string[];
};
