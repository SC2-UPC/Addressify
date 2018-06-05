'use strict';

const bigInt = require('big-integer');
const crypto = require('crypto-js');
var safeBuffer = require('safe-buffer')
const randomfill = require('randomfill')
var Buffer = safeBuffer.Buffer

bigInt.rand = function (bitLength) {
    let bytes = bitLength / 8;
    let buf = Buffer.alloc(bytes);
    randomfill.randomFillSync(buf);
    buf[0] = buf[0] | 128;  // first bit to 1 -> to get the necessary bitLength
    return bigInt.fromArray([...buf], 256);
};

bigInt.randBetween = function (start, end) {  // crypto rand in [start, end]
    let interval = end.subtract(start);
    let arr = interval.toArray(256).value;
    let buf = Buffer.alloc(arr.length);
    let bn;
    do {
        randomfill.randomFillSync(buf);
        bn = bigInt.fromArray([...buf], 256).add(start);
    } while (bn.compare(end) >= 0 || bn.compare(start) < 0);
    return bn;
};

bigInt.prime = function (bitLength) {
    let rnd;
    do {
        rnd = bigInt.rand(bitLength);
        console.assert(rnd.bitLength() == bitLength, 'ERROR: ' + rnd.bitLength() + ' != ' + bitLength);
    } while (!rnd.isPrime());
    return bigInt(rnd);
};

bigInt.prototype.bitLength = function () {
    let bits = 1;
    let result = this;
    const two = bigInt(2);
    while (result.greater(bigInt.one)) {
        result = result.divide(two);
        bits++;
    }
    return bits;
};

const generateRSAKeys = function (bitLength = 1024) {
    //generate p and q
    const p = bigInt.prime(bitLength);
    const q = bigInt.prime(bitLength);

    //calculate n and phi(n)
    const n = p.multiply(q);
    const phi = (p.minus(1)).multiply(q.minus(1));

    //define e and public key
    const e = bigInt(65537);
    const kPub = { "e": e.toString(16), "n": n.toString(16) };

    //define d and private key
    const d = e.modInv(phi);
    //const kPrv =
    const privateKey = new RSAPrivateKey(d, n);
    const publicKey = new RSAPublicKey(e, n);

    return { publicKey: publicKey, privateKey: privateKey };
}

const privateKey = function (key) {
    return new RSAPrivateKey(key.d, key.n);
}

const publicKey = function (key) {
    return new RSAPublicKey(key.e, key.n);
}

const hexToUTF8 = function(hexStr) {
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
    getRSAKeys: generateRSAKeys,
    privateKey: RSAPrivateKey,
    privateKey: privateKey,
    publicKey: RSAPublicKey,
    publicKey: publicKey,
    hexToUTF8: hexToUTF8
}