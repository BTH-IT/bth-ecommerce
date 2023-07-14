"use client"; // Error components must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section className="z-10 bg-[red] py-[120px] h-[95vh]">
      <div className="container">
        <div className="flex">
          <div className="w-full h-full">
            <div className="mx-auto max-w-[400px] text-center">
              <h2 className="mb-2 text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]">
                {error.message}
              </h2>
              <h4 className="mb-3 text-[22px] font-semibold leading-tight text-white">
                Oops! That page can't be found
              </h4>
              <p className="mb-8 text-lg text-white">
                The page you are looking for it maybe deleted
              </p>
              <a
                href="/"
                className="inline-block px-8 py-3 text-base font-semibold text-center text-white transition border border-white rounded-lg hover:bg-white hover:text-primary"
              >
                Go to Home
              </a>
              <button
                onClick={
                  // Attempt to recover by trying to re-render the segment
                  () => reset()
                }
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 flex items-center justify-between w-full h-full space-x-5 -z-10 md:space-x-8 lg:space-x-14">
        <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
        <div className="flex w-1/3 h-full">
          <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
          <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
        </div>
        <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
      </div>
    </section>
  );
}
