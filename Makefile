pwd := $(shell pwd)
node_path := ${pwd}/node_modules

clean:
	# remove bundled js
	rm -f static/*.bundle.js
	rm -f static/*.css

style:
	# compiling styles
	NODE_PATH=${node_path} NODE_ENV=development ${node_path}/.bin/stylus -u nib -o static styles/app.styl
	NODE_PATH=${node_path} NODE_ENV=development ${node_path}/.bin/autoprefixer static/app.css

style_min: style
	# compressing styles
	NODE_PATH=${node_path} NODE_ENV=production ${node_path}/.bin/cssmin static/app.css > static/app.min.css

dev_server: clean style
	NODE_PATH=${node_path} NODE_ENV=development node --harmony server.js

dev: clean style
	# starting dev server
	NODE_PATH=${node_path} NODE_ENV=development ${node_path}/.bin/supervisor -e js,jsx,styl -x make dev_server

bundle: clean
	# bundling js app
	NODE_ENV=production NODE_PATH=${node_path} ${node_path}/.bin/webpack

prod: bundle style_min
	# starting prod server
	NODE_ENV=production NODE_PATH=${node_path} node --harmony server.js
