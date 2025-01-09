import { Input } from "./ui/input";

export default function WikipediaSearch() {


    return (
        <form action={searchWikipedia}>
            <Input
                placeholder="Search..."
            />
        </form>
    )
}
