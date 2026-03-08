import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const features = [
    {
      title: "AI-Powered",
      description:
        "Generate blog outlines and content suggestions using advanced AI",
    },
    {
      title: "Rich Editor",
      description:
        "Full-featured text editor with formatting tools and live preview",
    },
    {
      title: "Export Ready",
      description: "Export your finished articles in multiple formats",
    },
  ];

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            AI Blog Generator
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transform your ideas into compelling blog posts with AI assistance.
            Generate outlines, write content, and export beautiful articles.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card text-card-foreground flex flex-col gap-3 px-6 py-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="pt-8">
          <Button size="lg" asChild>
            <Link to="/editor">Start Writing</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
