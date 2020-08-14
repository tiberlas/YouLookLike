import path from 'path';
import fs from 'fs';

class RestLogger {
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
			now + ' user: ' + user + ' url: ' + method + ' ' + url + '\n';

		fs.appendFile(this.filePath, msg, (err) => {
			if (err) {
				if (err.code == 'ENOENT') {
					//file dosent exist
					fs.writeFile(this.filePath, msg, (err) => {
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

	deleteFile(): void {
		try {
			fs.unlinkSync(this.filePath);
		} catch (err) {}
	}
}

const restLogger = new RestLogger();
module.exports = restLogger;
