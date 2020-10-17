const axios = require('axios');

const upload = async (file, sessionKey, dir) => {
	let url = `/upload?tag=${sessionKey}`;

	if (dir) {
		url = `/upload?tag=${sessionKey}&dir=${dir}`;
	}

	const { data } = await axios.post(`https://api.bitcoinfiles.org${url}`, file, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});

	return data;
};

const pay = async rawtx => {
	const { data } = await axios.post(`https://api.bitcoinfiles.org/pay`, { rawtx });
	return data;
};

const download = async txid => {
	const { data } = await axios.get(`https://media.bitcoinfiles.org/${txid}`);
	return data;
};

module.exports = { upload, pay, download };
