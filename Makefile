linter:
	npx eslint source server --fix

production:
	npm run build &&\
	node server/server.js

certs:
	openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout key.pem -out cert.pem
