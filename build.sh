#!/bin/bash
set -e
COMPONENT=$1
LANGUAGE=$2

SUFIX=""
if [ -n "$LANGUAGE" ]; then
    SUFIX="_${LANGUAGE}"
fi

PATH=$PATH:/root/.local/bin

#read samples
mkdir samples

aws --quiet s3 cp s3://dhtmlx-packages/${COMPONENT}/latest.txt ./
LATEST=`cat ./latest.txt`
aws --quiet s3 cp s3://dhtmlx-packages/${COMPONENT}/${COMPONENT}_${LATEST}_site.zip ./
unzip -q ./${COMPONENT}_${LATEST}_site.zip 'samples/*'


echo '{"samples":"./samples/"}' > madoka.local.json

#generate static docs
php index.php reindex
php -d memory_limit=512M index.php export_html
cd export && zip -qr ../${COMPONENT}.docs.html.zip ./ && cd ..

mkdir search
php -d memory_limit=512M index.php sphinx
cd search && zip -qr ../${COMPONENT}.docs.xml.zip ./ && cd ..

#store generated docs
aws --quiet s3 cp ./${COMPONENT}.docs.html.zip s3://dhtmlx-packages/docs/${COMPONENT}_${LATEST}${SUFIX}.html.zip
aws --quiet s3 cp ./${COMPONENT}.docs.xml.zip s3://dhtmlx-packages/docs/${COMPONENT}_${LATEST}${SUFIX}.xml.zip
aws --quiet s3 cp ./latest.txt s3://dhtmlx-packages/docs/${COMPONENT}${SUFIX}.latest.txt