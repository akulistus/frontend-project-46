lint:
	npx eslint .
install:
	npm ci
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8
fix:
	npx eslint --fix .
publish:
	npm publish --dry-run