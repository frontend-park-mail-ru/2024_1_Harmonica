linter:
	npx eslint -c ./.github/linters/.eslintrc.json ./source --fix

production:
	npm run build

certs:
	openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout key.pem -out cert.pem
