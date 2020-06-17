const fs = require('fs')
const path = require('path')
const purge = dir => {
	dir = dir || 'dist'
	fs.readdir(dir, (err, files) => {
		if(err) console.log(err)
		for(const file of files) {
			fs.unlink(path.join(dir, file), err => {
				if(err) console.log(err)
			})
		}
	})
}

purge()