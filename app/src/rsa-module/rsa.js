'use strict';

const bigInt = require('big-integer');
const crypto = require('crypto');

const privateKey = function (key) {
    return new RSAPrivateKey(key.d, key.n);
}

const publicKey = function (key) {
    return new RSAPublicKey(key.e, key.n);
}

const hexToUTF8 = function (hexStr) {
    const buff = Buffer.from(hexStr, 'hex');
    return buff.toString('utf8');
}

const RSAPrivateKey = class RSAPrivateKey {
    constructor(d, n) {
        this.d = d.toString(16);
        this.n = n.toString(16);
    }

    //mssg is the what you want to sign converted to a hex string
    sign(mssg) {
        //convert string to numeric
        const num = bigInt(mssg, 16);
        //ecrypt numeric message
        const enc = num.modPow(bigInt(this.d, 16), bigInt(this.n, 16));

        return enc.toString(16);
    }

    //mssg is a hex string
    decrypt(mssg) {
        //get mmessage from body
        const c = bigInt(mssg, 16);
        //decrypt message in numeric format
        const deNum = c.modPow(bigInt(this.d, 16), bigInt(this.n, 16));
        //convert message decrypted to string
        const de = deNum.toString(16);

        return de;
    }

    //hex string
    generateProof(params) {
        const hash = crypto.createHash('sha256').update(params).digest('hex');
        const proof = this.sign(hash);
        return proof;
    }
}

const RSAPublicKey = class RSAPublicKey {
    constructor(e, n) {
        this.e = e.toString(16);
        this.n = n.toString(16);
    }

    //mssg is the what you want to encrypt converted to a hex string
    encrypt(mssg) {
        //convert string to numeric
        const num = bigInt(mssg, 16);
        //ecrypt numeric message
        const enc = num.modPow(bigInt(this.e, 16), bigInt(this.n, 16));

        return enc.toString(16);
    }

    //mssg is hex string
    verify(mssg) {
        //get mmessage from body
        const c = bigInt(mssg, 16);
        //decrypt message in numeric format
        const deNum = c.modPow(bigInt(this.e, 16), bigInt(this.n, 16));
        //convert message decrypted to string
        const de = deNum.toString(16);

        return de;
    }

    checkProof(params, proof) {
        const hash = crypto.createHash('sha256').update(params).digest('hex');
        const verify = this.verify(proof)

        return (hash == verify);
    }

}

module.exports = {
    privateKey: RSAPrivateKey,
    privateKey: privateKey,
    publicKey: RSAPublicKey,
    publicKey: publicKey,
    hexToUTF8: hexToUTF8
}