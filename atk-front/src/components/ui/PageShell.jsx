import { Container } from './Container';

export function PageShell({ title, description, children, className = '' }) {
  return (
    <main className={`min-h-[50vh] pb-16 pt-10 md:pt-12 ${className}`}>
      <Container>
        {(title || description) && (
          <header className="mb-12 border-b border-[var(--color-border)] pb-10">
            {title && (
              <h1 className="text-balance text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
                {title}
              </h1>
            )}
            {description && (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600">{description}</p>
            )}
          </header>
        )}
        {children}
      </Container>
    </main>
  );
}
