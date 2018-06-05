Module to implement RSA protocol.



```
npm i --save rsa-cts2
```


```
const rsa = require('rsa-cts2');
```

-----------------------------------

**rsa.getRSAKeys(bitlength);**

Get a pair of RSA keys (private and public) in a base 16 string. The parameter *bitlength* specifies the number of bits of *p* and *q*. Default bitlength is 1024. Returns and object:

{
    privateKey: (privateKey object),
    publicKey:  (publicKey object)
}

A *privateKey* object has the structure:

{
    d: (string in base 16),
    n: (string in base 16)
}

A *prublicKey* object has the structure:

{
    e: (string in base 16),
    n: (string in base 16)
}

-----------------------------------

**_privateKey_.sign(mssg);**

Signs *mssg* with private key, which is a hex string. Returns a string in base 16.

**_privateKey_.decrypt(mssg);**

Decrypts *mssg*, previously encrypted with public key. Is a string in base 16. Returns an string object.

-----------------------------------

**_pyblicKey_.encrypt(mssg);**

Encrypts *mssg* with public key, which is a hex string. Returns a string in base 16.

**_publicKey_.verify(mssg);**

Verifies *mssg*, previously signed with private key. Is a string in base 16. Returns an string object.

-----------------------------------

**rsa.privateKey(key);**

Converts an object with the form

{
    d: (string in base 16),
    n: (string in base 16)
}

into a *rsa privateKey* object.

-----------------------------------

**rsa.publicKey(key);**

Converts an object with the form

{
    e: (string in base 16),
    n: (string in base 16)
}

into a *rsa publiceKey* object.

-----------------------------------

**rsa.hexToUTF8(hexStr);**

Converts a hex String to UTF8

-----------------------------------

**Example**

```
const msg = "Message";

const keys = rsa.getRSAKeys(512);
const hexMsg = Buffer.from(msg).toString('hex')
const c = keys.privateKey.sign(hexMsg);

const d = keys.publicKey.verify(c);
const initialMsg= rsa.hexToUTF8(d);
console.log(initialMsg) //out = Message
```