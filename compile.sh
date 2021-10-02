# expects to start in win96-repos folder (this folder)
node "meta files generator.js" apps
node "meta files generator.js" malware
cd ..
node "win96-repos/fsbuilder.js" win96-repos
read -p "Press enter to continue . . . "
