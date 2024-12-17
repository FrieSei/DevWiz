'use client';

import { SignUpButton } from "@clerk/nextjs";
import { Bot } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1">
            <Bot className="h-5 w-5" />
            <span className="text-sm font-medium">Now in Beta</span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl max-w-3xl">
            Code with Perfect Memory
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl">
            Build and understand complex backends through AI that actually gets your stack.
          </p>

          <SignUpButton mode="modal">
            <button className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
              Sign Up for Beta Testing
            </button>
          </SignUpButton>
        </div>
      </div>
    </section>
  );
}