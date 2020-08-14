import path from 'path';
import fs from 'fs';

export class FileLogger {
	log(crud: string, user: string, obj: any): void {
		let now = Date();
		let msg: string =
			now + ' user: ' + user + ' ' + crud + JSON.stringify(obj) + '\n';

		const filePath: string = path.join(
			__dirname,
			'..',
			'..',
			'log',
			'log_obj.txt'
		);
		console.log(filePath);

		fs.appendFile(filePath, msg, (err) => {
			if (err) {
				if (err.code == 'ENOENT') {
					//file dosent exist
					fs.writeFile(filePath, msg, (err) => {
						if (err) {
							console.log('COULD NOT OPEN LOGGER FILE');
							throw err;
						} else {
							console.log(msg);
						}
					});
				} else {
					console.log('COULD NOT OPEN LOGGER FILE');
					throw err;
				}
			} else {
				console.log(msg);
			}
		});
	}
}
