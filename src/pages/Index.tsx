
import Calculator from '@/components/Calculator/Calculator';

const Index = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center mb-10 animate-fade-in">
          <div className="inline-block py-1 px-3 mb-4 bg-primary/10 text-primary text-xs font-medium rounded-full">
            Reverse Polish Notation
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            RPN Calculator
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            A beautiful calculator using Reverse Polish Notation (RPN). Enter values, push them to the stack, and perform operations.
          </p>
        </header>

        <main className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <Calculator />
        </main>

        <footer className="pt-8 text-center text-sm text-muted-foreground">
          <p>Built with modern design principles</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
