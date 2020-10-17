# BitcoinFiles JS

Upload large files directly to Bitcoin. 

## Installation
```bash
```bash
npm install @matterpool/bitcoinfiles-js
``````

## Usage

Uploading a File
```javascript
```javascript
const bitcoinfiles = require('@matterpool/bitcoinfiles-js');

const workspaceId = '<insert-workspace-id>';
const file = new File(['foo', 'bar'], 'foobar.txt');
const formData = new FormData();
formData.append('file', file);
const upload = bitcoinfiles.upload(formData, workspaceId);
``````
