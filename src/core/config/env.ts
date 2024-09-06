const HOST = process.env.HOST as string;
const PORT = process.env.PORT as unknown as number;

const MONGODB_USERNAME = process.env.MONGODB_USERNAME as string;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD as string;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME as string;
const MONGODB_CLUSTER = process.env.MONGODB_CLUSTER as string;
const MONGODB_RETRY_WRITES = process.env.MONGODB_RETRY_WRITES as string;
const MONGODB_WRITE_CONCERN = process.env.MONGODB_WRITE_CONCERN as string;
const MONGODB_APP_NAME = process.env.MONGODB_APP_NAME as string;

const MONGODB_URL = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}/${MONGODB_DB_NAME}?retryWrites=${MONGODB_RETRY_WRITES}&w=${MONGODB_WRITE_CONCERN}&appName=${MONGODB_APP_NAME}`;

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export { HOST, PORT, MONGODB_URL, JWT_SECRET_KEY };
