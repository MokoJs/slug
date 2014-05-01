MOCHA_PATH=node_modules/mocha/bin/mocha
MOCHA_OPTS=--reporter=spec --harmony

test: 
	NODE_ENV=test $(MOCHA_PATH) $(MOCHA_OPTS) -w

test-debug: 
	NODE_ENV=test $(MOCHA_PATH) $(MOCHA_OPTS) debug

test-once:
	NODE_ENV=test $(MOCHA_PATH) $(MOCHA_OPTS)

.PHONY: test test-once test-debug
