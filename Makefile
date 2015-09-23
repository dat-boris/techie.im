BUCKET=www.techie.im

deploy:
	#s3cmd sync --exclude '.git/*' --exclude-from .gitignore . s3://$(BUCKET)/
	s3cmd sync . s3://$(BUCKET)/ --exclude '.git/*' --exclude-from .gitignore -c .s3cfg
	s3cmd setacl s3://$(BUCKET)/ --acl-public --recursive -c .s3cfg

server:
	http-server .