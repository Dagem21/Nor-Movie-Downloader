import crypto from 'node:crypto';

var key = Buffer.from('MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDE=', 'base64');

export function encrypt(plaintext) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
        'aes-256-cbc',
        key,
        iv
    );
    let encrypted = Buffer.concat([iv, cipher.update(plaintext, 'utf8'), cipher.final()]);
    return encrypted.toString('base64url');
}

export function decrypt(ivCiphertextB64) {
    const ivCiphertext = Buffer.from(ivCiphertextB64, 'base64url');
    const iv = ivCiphertext.subarray(0, 16);
    const ciphertext = ivCiphertext.subarray(16);
    const cipher = crypto.createDecipheriv(
        'aes-256-cbc',
        key,
        iv
    );
    let decrypted = Buffer.concat([cipher.update(ciphertext), cipher.final()]);
    return decrypted.toString('utf-8');
}

export function hashPass(plaintext) {
    const salt = 'lFD6jnfd7n8JNi84';
    const cipher = crypto.pbkdf2Sync(plaintext, salt, 10000, 64, 'sha512');
    return cipher.toString('hex');
}