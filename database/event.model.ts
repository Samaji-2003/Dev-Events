import mongoose, { type HydratedDocument, type Model, Schema } from "mongoose";

export interface EventInput {
  title: string;
  slug?: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type EventDocument = HydratedDocument<EventInput>;

type EventModel = Model<EventInput>;

const nonEmptyString = {
  type: String,
  required: true,
  trim: true,
  validate: {
    validator(value: string) {
      return value.length > 0;
    },
    message: "This field cannot be empty.",
  },
};

const stringArray = {
  type: [String],
  required: true,
  validate: {
    validator(values: string[]) {
      return values.length > 0 && values.every((value) => value.trim().length > 0);
    },
    message: "This field must contain at least one non-empty value.",
  },
};

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeDate(value: string): string {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error("Invalid event date.");
  }

  return parsed.toISOString();
}

function normalizeTime(value: string): string {
  const trimmed = value.trim();
  const match = trimmed.match(/^(\d{1,2}):(\d{2})(?:\s*([AP]M))?$/i);

  if (!match) {
    throw new Error("Invalid event time.");
  }

  let hours = Number.parseInt(match[1] ?? "0", 10);
  const minutes = match[2] ?? "00";
  const meridiem = match[3]?.toUpperCase();

  if (hours > 23 || Number.parseInt(minutes, 10) > 59) {
    throw new Error("Invalid event time.");
  }

  if (meridiem) {
    if (hours < 1 || hours > 12) {
      throw new Error("Invalid event time.");
    }

    if (meridiem === "PM" && hours !== 12) {
      hours += 12;
    }

    if (meridiem === "AM" && hours === 12) {
      hours = 0;
    }
  }

  return `${String(hours).padStart(2, "0")}:${minutes}`;
}

const eventSchema = new Schema<EventInput>(
  {
    title: nonEmptyString,
    slug: {
      type: String,
      unique: true,
      index: true,
      trim: true,
    },
    description: nonEmptyString,
    overview: nonEmptyString,
    image: nonEmptyString,
    venue: nonEmptyString,
    location: nonEmptyString,
    date: nonEmptyString,
    time: nonEmptyString,
    mode: nonEmptyString,
    audience: nonEmptyString,
    agenda: stringArray,
    organizer: nonEmptyString,
    tags: stringArray,
  },
  {
    timestamps: true,
  },
);

// Keep slug, date, and time normalized before saving.
eventSchema.pre("save", async function normalizeEventFields(this: EventDocument) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title);
  }

  this.date = normalizeDate(this.date);
  this.time = normalizeTime(this.time);
});

export const Event = (mongoose.models.Event as EventModel | undefined) ?? mongoose.model<EventInput>("Event", eventSchema);
