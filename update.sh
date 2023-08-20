#don't run local
cd /var/www/html/digitalfruit.sytes.net/web
sudo -u www-data git reset --hard
sudo -u www-data git pull
cd /var/www/html/digitalfruit.sytes.net/web/client
sudo -u www-data npm install
sudo -u www-data npm run build
cd /var/www/html/digitalfruit.sytes.net/web/server
sudo -u www-data npm install
sudo -u www-data npm run build
sudo -u www-data pm2 restart all

