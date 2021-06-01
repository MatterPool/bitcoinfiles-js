const axios = require('axios');

const upload = async (file, sessionKey, dir) => {
	let url = `/upload?tag=${sessionKey}`;

	if (dir) {
		url = `/upload?workspace=${sessionKey}&dir=${dir}`;
	}

	const { data } = await axios.post(`https://doge.bitcoinfiles.org${url}`, file, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});

	return data;
};

const pay = async rawtx => {
	const { data } = await axios.post(`https://doge.bitcoinfiles.org/pay`, Buffer.from(rawtx, 'hex'), { contentType: 'application/octet-stream'});
	return data;
};

const download = async txid => {
	const { data } = await axios.get(`https://doge.bitcoinfiles.org/${txid}`);
	return data;
};

module.exports = { upload, pay, download };
