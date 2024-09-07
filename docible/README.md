# Testing Ansible with Docker

## Building the image

`docker build -t fedora-ansible-ssh .`

## Starting the containers

`docker-compose up -d`

## Stopping the containers

`docker-compose down`

## Usage

To test that we can connect to our targets we will run a playbook that will add our SSH key to targets and then ping

- Run `docker exec -it ansible-controller ansible-playbook playbooks/ping_targets.yml`
  - (Optional) You can connect to the container to run the playbook
    - `docker exec -it ansible-controller sh`
    - `ansible-playbook playbooks/ping_targets.yml`
