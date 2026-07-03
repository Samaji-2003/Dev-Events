import mongoose, { type HydratedDocument, type Model, Schema, Types } from "mongoose";
import { Event } from "./event.model";

export interface BookingInput {
  eventId: Types.ObjectId;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type BookingDocument = HydratedDocument<BookingInput>;

type BookingModel = Model<BookingInput>;

const bookingSchema = new Schema<BookingInput>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event reference is required."],
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      lowercase: true,
      validate: {
        validator(value: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Email must be a valid email address.",
      },
    },
  },
  {
    timestamps: true,
  },
);

// Verify the booking points to a real event before persisting it.
bookingSchema.pre("save", async function validateEventReference() {
  const eventExists = await Event.exists({ _id: this.eventId });

  if (!eventExists) {
    throw new Error("Referenced event does not exist.");
  }
});

export const Booking = (mongoose.models.Booking as BookingModel | undefined) ?? mongoose.model<BookingInput>("Booking", bookingSchema);
