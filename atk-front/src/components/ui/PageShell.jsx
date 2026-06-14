import { Container } from './Container';

export function PageShell({ title, description, children, className = '' }) {
  return (
    <main className={`min-h-[50vh] min-w-0 max-w-full pb-12 pt-8 sm:pb-16 sm:pt-10 md:pt-12 ${className}`}>
      <Container>
        {(title || description) && (
          <header className="mb-8 border-b border-[var(--color-border)] pb-6 sm:mb-12 sm:pb-10">
            {title && (
              <h1 className="heading-accent text-balance break-words text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl md:text-4xl">
                {title}
              </h1>
            )}
            {description && (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:mt-4 sm:text-base">
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </Container>
    </main>
  );
}
