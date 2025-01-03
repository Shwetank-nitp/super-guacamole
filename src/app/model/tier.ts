import { Schema, model, models, Model } from "mongoose";

interface ITier {
  plan: "PRO" | "FREE";
  uid_clerk: string;
  usage: number;
  subscription_end_data: Date;
  tier_name: string;
}

const tierSchema = new Schema<ITier>({
  plan: {
    type: String,
    enum: ["PRO", "FREE"],
    default: "FREE",
  },
  usage: {
    type: Number,
    default: 5,
    max: 5,
    min: -1,
  },
  uid_clerk: {
    type: String,
    unique: true,
    required: true,
  },
  subscription_end_data: {
    type: Date,
  },
  tier_name: {
    type: String,
    default: null,
  },
});

const TierModel: Model<ITier> = models.Tier || model("Tier", tierSchema);

export default TierModel;
