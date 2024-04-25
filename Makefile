PORT ?= 8000

serve:
	@echo "Starting HTTP server on port $(PORT)"
	@python3 -m http.server $(PORT)

list-port:
	@lsof -i tcp:$(PORT) || echo "Port $(PORT) not found"

kill-port:
	lsof -t -i tcp:$(PORT) | xargs kill || true

.PHONY: serve
