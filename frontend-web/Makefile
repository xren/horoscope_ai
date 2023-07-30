INTERNAL_WEB_IMAGE ?= horoscope-web

TIME = $(shell date -u '+%Y-%m-%d-%H-%M-%S')
GIT_BRANCH = $(shell git rev-parse --abbrev-ref HEAD)
LASTEST_COMMIT = $(shell git rev-parse --short HEAD)
DIRTY = $(shell git diff HEAD --quiet && echo '' || echo '-dirty')
# TAG ?= ${USER}-local-${LASTEST_COMMIT}
TAG ?= ${USER}-local-${LASTEST_COMMIT}


DOCKER_HUB ?= xren
DOCKER_HUB_BASE_BUILD_IMAGE = ${DOCKER_HUB}/${INTERNAL_WEB_IMAGE}

DOCKER_BUILD=docker build
BUILDER_IMAGE ?= horoscope-web


all: build

.PHONY: up
up:
	cd ..; docker-compose up -d horoscope-web


.PHONY: run-local
run-local: 
	yarn run dev


.PHONY: build-docker
build-docker:
	cd ..; docker-compose build --build-arg TAG=${TAG}horoscope-web

.PHONY: build-push
build-push:
	cd ..; docker-compose build --build-arg TAG=${TAG} horoscope-web
	docker tag ${INTERNAL_WEB_IMAGE} ${DOCKER_HUB_BASE_BUILD_IMAGE}:${TAG}
	docker tag ${INTERNAL_WEB_IMAGE} ${DOCKER_HUB_BASE_BUILD_IMAGE}:latest

	docker push ${DOCKER_HUB_BASE_BUILD_IMAGE}:${TAG}
	docker push ${DOCKER_HUB_BASE_BUILD_IMAGE}:latest


