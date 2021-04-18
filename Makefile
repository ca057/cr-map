.PHONY: tileserver

tileserver:
	docker run --env-file .env -v `pwd`/tegola:/opt/tegola_config -p 8080:8080 gospatial/tegola serve --config /opt/tegola_config/config.toml
