import { Code2, Users } from "lucide-react";

export function TechnicalDepthSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">DevWiz Builds with Understanding</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AST parsing, framework-aware context, and semantic embeddings ensure your backend stays coherent and maintainable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Code2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold">For Developers</h3>
            <p className="text-muted-foreground">
              Like git grep with a PhD in your stack. Full semantic search across repos.
            </p>
          </div>

          <div className="space-y-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold">For Non-Developers</h3>
            <p className="text-muted-foreground">
              Describe what you need. DevWiz builds production-ready backend code.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}