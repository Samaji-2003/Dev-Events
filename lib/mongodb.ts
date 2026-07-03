import mongoose from "mongoose";

// Reuse the same in-memory cache across hot reloads in development.
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

function getMongoUri(): string {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in the environment.");
  }

  return mongoUri;
}

const cached = globalThis.mongooseCache ?? { conn: null, promise: null };

if (process.env.NODE_ENV !== "production") {
  globalThis.mongooseCache = cached;
}

/**
 * Establishes a MongoDB connection and reuses it when possible.
 */
export async function connectMongo(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const mongoUri = getMongoUri();

    cached.promise = mongoose.connect(mongoUri, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;

  return cached.conn;
}