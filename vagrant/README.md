# couchdb-vagrant

A quick way to set up a VM running couchdb


Install Vagrant, VirtualBox and git
---

    http://www.vagrantup.com
    https://www.virtualbox.org (don't worry about setting up any VMs as the steps below will cover this)
    http://git-scm.com


Set up
---

    Edit /etc/hosts locally and add `192.168.50.15 couchdb.dev`
    $ git clone https://github.com/redgeoff/couchdb-vagrant.git
    $ cd couchdb-vagrant
    $ vagrant up
    $ vagrant ssh


Futon:
---

    http://couchdb.dev:5984/_utils
