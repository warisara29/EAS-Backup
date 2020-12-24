FROM python:3.8-alpine

ENV PATH="/scripts:${PATH}"

COPY ./requirements.txt /requirements.txt

RUN apk update
RUN apk add g++ gcc unixodbc-dev libc-dev libffi-dev libxml2 mariadb-dev postgresql-dev
RUN apk add --update --no-cache --virtual .tmp gcc libc-dev linux-headers 
RUN pip install -r /requirements.txt
RUN apk del .tmp

RUN apk --no-cache add curl
# RUN apk --no-cache add gpg
# RUN curl https://packages.microsoft.com/keys/microsoft.asc 
# RUN curl https://packages.microsoft.com/config/ubuntu/18.04/prod.list
# RUN exit
# RUN ACCEPT_EULA=Y msodbcsql17
# RUN apk update
# RUN ACCEPT_EULA=Y  
# RUN apk --install msodbcsql17
# RUN ACCEPT_EULA=Y apk msodbcsql17
# RUN ACCEPT_EULA=Y apk mssql-tools
# RUN echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bash_profile
# RUN echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc


RUN mkdir /myproject
COPY ./myproject /myproject
WORKDIR /myproject
COPY ./scripts /scripts

# COPY /nginx.conf /etc/nginx/conf.d/default.conf


#Download the desired package(s)
RUN curl -O https://download.microsoft.com/download/e/4/e/e4e67866-dffd-428c-aac7-8d28ddafb39b/msodbcsql17_17.6.1.1-1_amd64.apk
RUN curl -O https://download.microsoft.com/download/e/4/e/e4e67866-dffd-428c-aac7-8d28ddafb39b/mssql-tools_17.6.1.1-1_amd64.apk


#(Optional) Verify signature, if 'gpg' is missing install it using 'apk add gnupg':
RUN curl -O https://download.microsoft.com/download/e/4/e/e4e67866-dffd-428c-aac7-8d28ddafb39b/msodbcsql17_17.6.1.1-1_amd64.sig
RUN curl -O https://download.microsoft.com/download/e/4/e/e4e67866-dffd-428c-aac7-8d28ddafb39b/mssql-tools_17.6.1.1-1_amd64.sig

RUN curl https://packages.microsoft.com/keys/microsoft.asc
# RUN gpg --verify msodbcsql17_17.6.1.1-1_amd64.sig msodbcsql17_17.6.1.1-1_amd64.apk
# RUN gpg --verify mssql-tools_17.6.1.1-1_amd64.sig mssql-tools_17.6.1.1-1_amd64.apk


#Install the package(s)
RUN apk add --allow-untrusted msodbcsql17_17.6.1.1-1_amd64.apk
RUN apk add --allow-untrusted mssql-tools_17.6.1.1-1_amd64.apk

RUN chmod +x /scripts/*

RUN mkdir -p /vol/web/media
RUN mkdir -p /vol/web/

RUN adduser -D user
RUN chown -R user:user /vol
RUN chmod -R 755 /vol/web
USER user

CMD ["entrypoint.sh"]




