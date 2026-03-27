name 'Mythic Phone'
description 'Phone UI Rewrite For Mythic'
author '[Alzar]'
version 'v1.0.3'
url 'https://www.mythicrp.com'
lua54 'yes'
fx_version "cerulean"
game "gta5"
client_script "@mythic-base/components/cl_error.lua"
client_script "@mythic-pwnzor/client/check.lua"

ui_page 'web/dist/index.html'

files {
  'web/dist/index.html',
  'web/dist/assets/*',
}
  
client_scripts {
  'client/*.lua',
  'client/apps/**/*.lua',
}

server_scripts {
  'server/*.lua',
  'server/apps/**/*.lua',
}
