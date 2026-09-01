export default function WorkLoading() {
  return (
    <main aria-busy="true" className="mx-auto max-w-content px-4 pt-36 pb-24 sm:px-6">
      <div className="h-3 w-40 animate-pulse rounded-sm bg-muted" />
      <div className="mt-7 h-12 w-4/5 max-w-[34rem] animate-pulse rounded-sm bg-muted" />
      <div className="mt-4 h-12 w-3/5 max-w-[26rem] animate-pulse rounded-sm bg-muted" />
      <div className="mt-8 h-4 w-2/3 max-w-[30rem] animate-pulse rounded-sm bg-muted" />
      <div className="mt-2 h-4 w-1/2 max-w-[24rem] animate-pulse rounded-sm bg-muted" />
    </main>
  );
}
