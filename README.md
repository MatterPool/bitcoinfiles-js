# BitcoinFiles JS

Upload up to 218MB files to Bitcoin.

- [JS SDK](https://github.com/MatterPool/bitcoinfiles-js/blob/main/README.md#js-usage)
- [HTTP API](https://github.com/MatterPool/bitcoinfiles-js/blob/main/README.md#api-usage)

# JS Usage

## Installation

```bash
npm install @matterpool/bitcoinfiles-js
``````

## Import

```javascript
const bitcoinfiles = require('@matterpool/bitcoinfiles-js');
```

## Upload

```javascript
const file = new File(['foo', 'bar'], 'foobar.txt');
const formData = new FormData();
formData.append('file', file);
const upload = await bitcoinfiles.upload(formData, '<workspace-id>');
```

## Pay

```javascript
const paymentAddress = upload.payment_address;
const paymentSatoshis = upload.payment_satoshis;

// ...build transaction using paymenAddress and paymentSatoshis
const rawtx = '....'

const payment = await bitcoinfiles.pay(rawtx);
const txid = payment.result[0].txid // txid of the bitcoin file
```

## Download

```javascript
const txid = '8f7090ec72a692e7bb893a3fd4ef1e508c655a284a5b736b3cc7c63649748562'
const file = await bitcoinfiles.download(txid);
```

# API Usage

## Upload

To use BitcoinFiles, you first upload a file, then you pay for it to be settled on the bitcoin ledger.

Request

```
POST https://api.bitcoinfiles.org/upload?tag=<workspace-id>
Content-Type: multipart/form-data
Body:
  file: <file-contents>
```

Response

```javascript
{
    payment_address: '18Qi1rXJSLDLUYDZVkRT3ZdyB3E9eZamY2',
    payment_satoshis: 2833,
    session_tag: '<workspace-id>',
    location: '<file-cdn-url>'
}
```


## Pay

To pay for a file, send `payment_satoshis` to `payment_address`. You can pay for multiple files at once in the same transaction and the response will return an array of the files you uploaded

Request

```
POST https://api.bitcoinfiles.org/pay
Content-Type: application/json
Body:
{
  rawtx: '<raw-transaction-hex>'
}
```

Response

```javascript
{
    errors: [],
    status: 200,
    result: [{
        txid: 'f7a3e5838a134a78b6a5033aa928efb7849be6212307b9b9eed3c738ea470bc2',
        session_tag: '<workspace-id>',
        fileurl: '<file-cdn-url>',
        payment_address: '18Qi1rXJSLDLUYDZVkRT3ZdyB3E9eZamY2',
        payment_sats_needed: 2833,
        filesize: 2775,
        created_time: 1602905335,
        filename: '<filename>',
    }]
}
```

## Download

You can download a file by using it's transaction id. This link can be used in html tags like `<img>`, `<video>` or `<audio>`

Request

```
GET https://media.bitcoinfiles.org/[txid]
```


# Authors

- [@1](https://twetch.app/u/1)
