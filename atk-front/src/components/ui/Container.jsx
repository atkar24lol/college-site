export function Container({ children, className = '' }) {
  return (
    <div className={`mx-auto min-w-0 w-full max-w-[1200px] px-4 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
