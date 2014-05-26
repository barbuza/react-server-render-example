pwd := $(shell pwd)
node_path := ${pwd}/node_modules

clean:
	# remove bundled js
	rm -f static/*.bundle.js

dev: clean
	# starting dev server
	NODE_PATH=${node_path} NODE_ENV=development ${node_path}/.bin/supervisor -e js,jsx node --harmony server.js

bundle: clean
	# bundling js app
	NODE_ENV=production NODE_PATH=${node_path} ${node_path}/.bin/webpack

prod: bundle
	# starting prod server
	NODE_ENV=production NODE_PATH=${node_path} node --harmony server.js
