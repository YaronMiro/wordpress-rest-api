# wordpress-rest-api

Set up File and Folders permissions

`$ chown www-data:www-data  -R *`

`find . -type d -exec chmod 755 {} \;`

`find . -type f -exec chmod 644 {} \;`

`chown <username>:<username>  -R *`

`chown www-data:www-data wp-content`