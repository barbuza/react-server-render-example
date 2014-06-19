pwd := $(shell pwd)
node_path := ${pwd}/node_modules
bin_path := ${node_path}/.bin

clean:
	@rm -f static/*.bundle.js static/*.css static/*.bundle.js.map

prod_style:
	# compiling production styles
	@${bin_path}/stylus -u nib -u autoprefixer-stylus --compress --import styles/helpers -o static styles/app.styl

dev_style:
	# compiling development styles
	@${bin_path}/stylus -u nib -u autoprefixer-stylus --import styles/helpers -o static styles/app.styl

dev_bundle:
	# building development bundle
	@NODE_ENV=development ${bin_path}/webpack -d --hide-modules --progress -c

prod_bundle:
	# building production bundle
	@NODE_ENV=production ${bin_path}/webpack --hide-modules --optimize-minimize --optimize-occurence-order --optimize-dedupe

dev_server: clean dev_style dev_bundle
	# starting dev server
	@-NODE_ENV=development node --harmony server.js

dev: clean
	@NODE_ENV=development ${bin_path}/supervisor -e js,jsx,styl -x make dev_server

prod: clean prod_style prod_bundle
	# starting prod server
	@NODE_ENV=production node --harmony server.js

lint:
	# checking javascripts
	@${bin_path}/jsxhint *.js views/*.jsx components/*.jsx actions/*.js utils/*.js
