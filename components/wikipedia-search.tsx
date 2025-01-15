'use client'

// import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AutoComplete, Option } from "./autocomplete";

export default function WikipediaSearch() {

    return (
        <div>
            <AutoComplete
                placeholder="Search..."
                emptyMessage="No results..."
            // defaultValue={searchParams.get('query') || ''}
            // onChange={e => debouncedHandleSearch(e.target.value)}
            />
            {/* <Input
            /> */}
            <Button
                size='sm'
                className='mt-2'
                type='submit'>
                Submit
            </Button>
        </div>
    )
}
