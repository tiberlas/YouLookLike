import path from 'path';
import fs from 'fs';

export class RestLogger {
	private filePath: string = path.join(
		__dirname,
		'..',
		'..',
		'log',
		'log_rest.txt'
	);

	log(method: string, url: string, user: string): void {
		let now = Date();
		let msg: string =
			now + ' url: ' + method + ' ' + url + '\tuser: ' + user + '\n';
		let dir = './log';

		fs.appendFile(this.filePath, msg, (err) => {
			if (err) {
				if (err.code == 'ENOENT') {
					//file dose not exist
					if(!fs.existsSync(dir)){
						fs.mkdirSync(dir);
					}

					fs.writeFile(this.filePath, msg, (err) => {
						if(err) {
							console.log('COULD NOT OPEN LOGGER DIR');
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

	deleteFile(): void {
		try {
			fs.unlinkSync(this.filePath);
		} catch (err) {}
	}
}
