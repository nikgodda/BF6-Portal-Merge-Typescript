# BF6 Portal Merge Typescript

## install
```npm install```

## build once
```npm run build```

## rebuild on change
```npm run watch```

## update /mod/index.d.ts and /modlib/index.ts
```npm run update-sdk```

## output file
merged.ts

## NOTES ##
### /code ###
- Contains Official Portal SDK ```/mod/index.d.ts``` and ```/modlib/index.ts``` files provided by [Battlefield Portal Community](https://github.com/battlefield-portal-community/OfficailPortalSDK)  
- Files are updated automatically on ```npm install```  

- To update manually use ```npm run update-sdk```

### /sripts ### 
- Merge script  

- Script to update mod and modlib files in /code folder 

### /src ### 
- Entry point file ```main.ts``` should contain mod events

- Example folder

- ```import * as modlib from 'modlib'``` to use modlib in classes or main.ts
