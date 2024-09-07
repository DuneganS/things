FROM fedora

RUN dnf install -y \
    ansible \
    openssh-server \
    openssh-clients \
    sshpass \
    && dnf clean all \
    && rm -rf /var/cache/dnf /var/lib/dnf

RUN mkdir -p /var/run/sshd && \
    echo 'root:password' | chpasswd && \
    sed -i 's/^#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config && \
    ssh-keygen -A && \
    ssh-keygen -t rsa -b 4096 -N "" -f /root/.ssh/id_rsa

RUN mkdir -p /ansible

WORKDIR /ansible

EXPOSE 22

CMD ["/usr/sbin/sshd", "-D"]