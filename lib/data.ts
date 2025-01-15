export async function fetchWikipediaContent(query: string) {
    if (!query?.trim()) return null

    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&redirects=1&titles=${encodeURIComponent(query)}`

    try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        const pages = data.query.pages
        const pageId = Object.keys(pages)[0]
        const content = pages[pageId].extract

        return { query, content, error: '' }
    } catch (error) {
        console.error('Error fetching Wikipedia content:', error)
        return { query, content: '', error: 'Error fetching content' }
    }
}
