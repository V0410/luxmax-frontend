build_dev:
	docker build -f Dockerfile_dev -t ${service_image}  .
build_prod:
	docker build -f Dockerfile_prod -t ${service_image}  .
srv_up_dev:
	docker rm -f luxmax_service_main_front2 && docker compose -f srv_dev.yml up -d
srv_up_prod:
	docker rm -f luxmax_service_main_front && docker compose -f srv_prod.yml up -d
net_create:
	docker network create  --subnet=172.10.10.0/24  main_front_network



srv_up_dev2:
	docker rm -f luxmax_service_main_front2 && docker compose -f srv_dev2.yml up -d
