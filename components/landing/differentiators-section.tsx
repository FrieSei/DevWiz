import { Brain, Network, GitBranch } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const differentiators = [
  {
    title: "True Backend Understanding",
    description: "First AI that truly handles backend complexity - from architecture to implementation.",
    icon: Brain,
  },
  {
    title: "Advanced Memory System",
    description: "RAG + embeddings maintains complete context of your codebase.",
    icon: Network,
  },
  {
    title: "Deep Code Relations",
    description: "Understands relationships between services, functions, and dependencies in real-time.",
    icon: GitBranch,
  },
];

export function DifferentiatorsSection() {
  return (
    <section className="bg-muted/50 py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {differentiators.map((item, index) => (
            <Card key={index} className="bg-background">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-6 w-6" />
                </div>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}