export function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
      <div className="max-w-xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-amber-400">
          Car Dealership
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Inventory System
        </h1>
        <p className="mt-5 text-base leading-7 text-slate-400">
          The application scaffold is ready. The vehicle catalogue, search, and inventory
          workflows will be built here.
        </p>
      </div>
    </main>
  );
}
