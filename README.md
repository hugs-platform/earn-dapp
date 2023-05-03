# folder structure explained

## public folder

- static folder (to keep your static assets in it with all assets bundling and compressing benefits.)
  1. assets (contains static images (jpeg, avif, webp, svg...) OR video format (not recommended))
  2. styles (plain general css: reset, fonts, vars, globals, etc...)
     - reset (resets all your css)
     - fonts (@font-face = allows for costum fonts on websites)
     - vars (for styling that maybe needs to be changed later)
     - globals (for all css that needs to be global + converts 1rem to 10px )
  3. fonts (all your fonts in files (woff, woff2, ttf, etc...))

## pages

- for all your page/routing (navigation is with folders in nextJS)

## components

- for all components you may need,
  - general rules of these are:
    1. create a good structure (not all components in one folder)
    2. each folder has a separate css file
    3. it is okay to create a folder for each component (containing the ts,js,tsx or jsx file + css file)

## src

- (to be continued)

## core

- ###### utils

  - (to be continued)

  1. returning functions (converters map)

  - explenainion converters functions (to be continued)

  2. helper functions (helpers map)

  - explenainion helper functions (to be continued)

- ###### values
  - (to be continued)

## .env && .env.local

- for all secrets (access_tokens, api keys, secrret id's, etc...) that can't be pushed to a repo
- you can't find this files when cloning or copying from a repo (obviously)

## .gitignore

- for files or folders that shouldn't be pushed to a repo (node modules, .env files, images or video's etc...)

## tsconfig

- for typescript configuration

## testing

- for all your test like (give this also a logical structure):
  1. Unit tests
  2. integration tests
  3. ...

## TODO

1. map(s) for collecting, converting and sending database data
