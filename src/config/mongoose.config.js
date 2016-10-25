import mongoose from "mongoose";
import {MONGO_CONNECTION_URL} from "./constants";

// plug in native promises instead of mpromises
mongoose.Promise = global.Promise;

mongoose.connect(MONGO_CONNECTION_URL);

mongoose.connection.on('error', console.error.bind(console, 'Connection Error: '));
mongoose.connection.once('open', console.log.bind(console, 'Connected to MongoDB'));

export default mongoose;