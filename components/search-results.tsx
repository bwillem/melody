import { fetchWikipediaContent } from "@/lib/data"

export default async function SearchResults({ query }: { query: string }) {
    const wikipediaResults = await fetchWikipediaContent(query)

    // console.log('wikipedia results', wikipediaResults)

    return (
        <div className='grid'>
            
        </div>
    )
}
