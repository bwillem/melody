import SearchResults from "@/components/search-results";
import WikipediaSearch from "@/components/wikipedia-search";
import Image from "next/image";
import { Suspense } from "react";
import { hennyPenny, tiny } from "./fonts";

const suggested = []

function Suggested() {
  return null
}

export default async function Home({ searchParams }: any) {
  const params = await searchParams
  const query = params.query

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col">
          <h1 className={`text-primary text-3xl lg:text-4xl ${hennyPenny.className}`}>Melody</h1>
          <h2 className={`text-muted-foreground ${tiny.className} text-sm mt-[-22px] ml-[-22px]`}>AI learning tool</h2>
          <Suspense>
            <WikipediaSearch />
          </Suspense>
          <Suspense>
            <Suggested />
          </Suspense>
          <SearchResults query={query} />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <div></div>
        <h4></h4>
      </footer>
    </div>
  );
}
