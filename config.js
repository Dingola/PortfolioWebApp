import dotenv from 'dotenv';
import assert from 'assert';

dotenv.config();

const {
    PORT,
    HOST,
    HOST_URL,
    EMAIL_USER,
    EMAIL_PASS
} = process.env;

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');

const config = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    email_user: EMAIL_USER,
    email_pass: EMAIL_PASS
};

export default config;