"use client";

import { Bot, Image, Music } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { motion } from "framer-motion";

const items = [
  {
    name: "Conversation",
    about:
      "Engage in interactive and advanced conversations with a cutting-edge language model powered by Microsoft.",
    features: [
      "Contextual understanding",
      "In-depth explanations",
      "Code generation and debugging",
      "Multi-turn dialogues",
    ],
    color: "text-yellow-500",
    useCases: [
      "Customer support automation",
      "Education and learning assistance",
      "Software engineering help",
      "Creative writing and ideation",
    ],
    link: "https://huggingface.co/microsoft/Phi-3-mini-4k-instruct",
    logo: Bot,
    supportedLanguages: ["English", "Spanish", "French", "German", "Japanese"],
  },
  {
    name: "Music Generation",
    about:
      "Generate custom music tracks using a small yet powerful music generation model.",
    features: [
      "Genre-based music generation",
      "Customizable mood and tempo",
      "Multi-instrument compositions",
    ],
    color: "text-pink-500",
    useCases: [
      "Background scores for videos",
      "Game soundtracks",
      "Jingles and advertising",
      "Creative music experimentation",
    ],
    link: "https://huggingface.co/facebook/musicgen-small",
    logo: Music,
    supportedFileFormats: ["MP3", "WAV", "MIDI"],
  },
  {
    name: "Image Generation",
    about:
      "Create stunning visuals and graphics with an advanced image generation tool.",
    features: [
      "High-quality AI-generated images",
      "Customizable prompts for creative control",
      "Supports various art styles and themes",
    ],
    color: "text-green-500",
    useCases: [
      "Marketing materials and ads",
      "Digital art and illustrations",
      "Concept designs and prototyping",
      "Social media content creation",
    ],
    link: "https://huggingface.co/black-forest-labs/FLUX.1-dev",
    logo: Image,
    resolutionOptions: ["1024x1024", "1920x1080", "4K"],
  },
];

const Features = () => {
  return (
    <div className="flex flex-wrap justify-center gap-8 py-8">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 100 + 50 * index }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "anticipate" }}
          whileHover={{
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.7)",
            transition: { duration: 0.5, ease: "backOut" },
          }}
        >
          <Card className="w-80 shadow-md h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>{item.name}</span> <item.logo className={item.color} />
              </CardTitle>
              <CardDescription className="text-sm">
                {item.about}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside mb-4 text-gray-700">
                {item.features.map((feature, idx) => (
                  <li key={`feature-${index}-${idx}`}>{feature}</li>
                ))}
              </ul>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Learn more about ${item.name}`}
                className="underline text-blue-600"
              >
                Know more.
              </a>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default Features;
