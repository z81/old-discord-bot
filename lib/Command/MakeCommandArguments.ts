import { MessageParser } from '../MessageParser';
import { Guard } from '../Guard/Guard';
import { MessageCommandData } from '../Message/MessageCommandData';
import { Observable } from 'rxjs';

export type MakeCommandArguments = {
	messageParser: MessageParser;
	execute(msg: Observable<MessageCommandData>): Observable<unknown>;
	guards?: Guard[];
};
