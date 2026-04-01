fx_version "cerulean"
game "gta5"
lua54 'yes'
use_experimental_fxv2_oal 'yes'

name 'Mythic Phone'
description 'Phone UI Rewrite For Mythic'

version '1.0.1'
repository 'https://github.com/Mythic-Framework/mythic-phone'

client_script "@mythic-base/components/cl_error.lua"
client_script "@mythic-pwnzor/client/check.lua"
client_scripts {
  'client/*.lua',
  'client/apps/**/*.lua',
}

server_scripts {
  'server/*.lua',
  'server/apps/**/*.lua',
}

files {
  'web/dist/index.html',
  'web/dist/assets/*',
}

ui_page 'web/dist/index.html'