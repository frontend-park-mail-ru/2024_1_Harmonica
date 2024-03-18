linter:
	npx eslint source server --fix

production:
	npm run build &&\
	node server/server.js
