#!/bin/sh

sed -i 's#__API_URL__#'"$API_URL"'#g' /usr/share/nginx/html/env.js;
sed -i 's#__DESCRIPTION_RETRIEVAL__#'"$DESCRIPTION_RETRIEVAL"'#g' /usr/share/nginx/html/env.js;
sed -i 's#__DESCRIPTION_READING__#'"$DESCRIPTION_READING"'#g' /usr/share/nginx/html/env.js;
sed -i 's#__DESCRIPTION_QA__#'"$DESCRIPTION_QA"'#g' /usr/share/nginx/html/env.js;
