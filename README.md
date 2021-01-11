Node CLI for Theme Kit config file

```
npx theme-kit-init
```

```yml
# config.yml
development:
  store: aaaabbbb.myshopify.com
  password: aaaabbbbcccc
  theme_id: '11112222'
  ignore_files:
    - config/settings_data.json
```

```sh
# General
.DS_Store
._*

# ThemeKit
config/settings_data.json
config.yml
```
