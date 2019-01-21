import { MessageParser } from '../MessageParser';
import { Guard } from '../Guard/Guard';
import { MessageCommandData } from '../Message/MessageCommandData';

export type MakeCommandArguments = {
	messageParser: MessageParser;
	execute(msg: MessageCommandData): void;
	guards?: Guard[];
};
