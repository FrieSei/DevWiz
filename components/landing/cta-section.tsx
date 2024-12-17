'use client';

import { SignUpButton } from "@clerk/nextjs";

export function CTASection() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Build with DevWiz?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Sign up for Beta testing now and see how AI can transform your backend development.
        </p>
        
        <SignUpButton mode="modal">
          <button className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
            Sign Up for Beta
          </button>
        </SignUpButton>
      </div>
    </section>
  );
}