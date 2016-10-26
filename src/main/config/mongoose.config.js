import mongoose from 'mongoose';
import {MONGO_CONNECTION} from './constants';

// plug in native promises instead of mpromises
mongoose.Promise = global.Promise;

const host = MONGO_CONNECTION[process.env.NODE_ENV];

mongoose.connect(host);

mongoose.connection.on('error', console.error.bind(console, 'Connection Error: '));
mongoose.connection.once('open', console.log.bind(console, `Connected to MongoDB. Host: ${host}`));

export default mongoose;