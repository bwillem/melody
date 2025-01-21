'use client'

import { AutoComplete } from "./autocomplete";

export default function WikipediaSearch() {

    return (
        <div className="w-96">
            <AutoComplete
                placeholder="Search..."
                emptyMessage="No results..."
            />
        </div>
    )
}
