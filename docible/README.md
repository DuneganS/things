# Testing Ansible with Docker

## Building the image

`docker build -t docible .`

## Starting the containers

`docker-compose up -d`

## Stopping the containers

`docker-compose down`

## Usage

For a simple test we can do the following:

1. `docker exec -it ansible-controller ansible all -m ping` - Will check that the targets are unreachable
2. `docker exec -it ansible-controller ansible-playbook playbooks/add_ssh_key.yml` - Adds our SSH key to the targets
3. `docker exec -it ansible-controller ansible all -m ping` - Will check that the targets are reachable

If you want to connect to the controller to run the commands directly you can follow these steps:

1. `docker exec -it ansible-controller sh`
2. `ansible all -m ping`
3. `ansible-playbook playbooks/add_ssh_key.yml`
4. `ansible all -m ping`
