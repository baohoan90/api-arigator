const crypto = require('crypto');

/**
 * AuthUtils
 * @author dev.local
 */
class AuthUtils {

    static HEX = 'hex';
    static DIGEST = 'sha512';
    static SALT_LENGTH = 8;
    static HASH_LENGTH = 16;
    static ITERATIONS = 52023;

    /**
     * encryptPassword
     * @param {String} password 
     * @returns Encrypted password
     */
    static encryptPassword (plainPassword) {
        // The resulting string will be twice as long as the random bytes you generate; 
        // Each byte encoded to hex is 2 characters. 4 bytes will be 8 characters of hex.
        const salt = crypto.randomBytes(this.SALT_LENGTH/2).toString(this.HEX);
        const hash = crypto.pbkdf2Sync(plainPassword, salt, this.ITERATIONS, this.HASH_LENGTH, this.DIGEST).toString(this.HEX);
        return salt + hash;
    }

    /**
     * verifyPassword
     * @param {String} plainPassword 
     * @param {String} encryptedPassword
     * @returns True/False
     */
    static verifyPassword(plainPassword, encryptedPassword) {
        const salt = encryptedPassword.substring(0, this.SALT_LENGTH);
        const hash = encryptedPassword.substring(this.SALT_LENGTH);
        const hashVerify = crypto.pbkdf2Sync(plainPassword, salt, this.ITERATIONS, this.HASH_LENGTH, this.DIGEST).toString(this.HEX);
        return hash === hashVerify;
    }
}

module.exports = AuthUtils