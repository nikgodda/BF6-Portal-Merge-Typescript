# BF6 Portal Merge Typescript

## HOW TO USE ##

- ```npm install```

- create and use some classes in /src folder

- ```npm run build``` or ```npm run watch```

- Copy ```merged.ts``` entire content and paste into Portal web interface

- Done

## COMMANDS ##

## Install
```npm install```

## Build merged.ts
```npm run build```

## Rebuild merged.ts on files change
```npm run watch```

## Update /code/mod/index.d.ts and /code/modlib/index.ts
```npm run update-sdk```

## NOTES ##

### /code ###
- Contains Official Portal SDK ```/mod/index.d.ts``` and ```/modlib/index.ts``` files provided by [Battlefield Portal Community](https://github.com/battlefield-portal-community/OfficailPortalSDK)  
- Files are updated automatically on ```npm install```  

- To update manually use ```npm run update-sdk```

### /sripts ### 
- Merge script  

- Script to update SDK files in /code folder 

### /src ### 
- Entry point file ```main.ts``` should contain SDK events

- Example

- ```import * as modlib from 'modlib'``` to use modlib in classes or main.ts
