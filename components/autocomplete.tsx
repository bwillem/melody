import {
    CommandGroup,
    CommandItem,
    CommandList,
    CommandInput,
} from "./ui/command"
import { Command as CommandPrimitive } from "cmdk"
import { useState, useRef, useCallback, type KeyboardEvent, useEffect } from "react"

import { Skeleton } from "./ui/skeleton"

import { Check } from "lucide-react"
import { cn } from "../lib/utils"
import { useDebouncedCallback } from "use-debounce"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import LoadingSpinner from "./ui/spinner"

export type Option = Record<"value" | "label", string> & Record<string, string>

type AutoCompleteProps = {
    // options: Option[]
    emptyMessage: string
    value?: Option
    onValueChange?: (value: Option) => void
    isLoading?: boolean
    disabled?: boolean
    placeholder?: string
}

export const AutoComplete = ({
    placeholder,
    emptyMessage,
    value,
    onValueChange,
    disabled,
    isLoading = false,
}: AutoCompleteProps) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const [isOpen, setOpen] = useState(false)
    const [selected, setSelected] = useState<Option>(value as Option)
    const [inputValue, setInputValue] = useState<string>(value?.label || "")

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    const [loading, setLoading] = useState(false)
    const [options, setOptions] = useState<Option[]>([])
    const params = new URLSearchParams(searchParams)
    const query = params.get('query')

    const debouncedHandleSearch = useDebouncedCallback((term: string) => {
        if (term) {
            params.set('query', term)
        } else {
            params.delete('query')
        }
        replace(`${pathname}?${params.toString()}`)
    }, 300)

    useEffect(() => {
        if (inputValue) {
            setLoading(true)
            debouncedHandleSearch(inputValue)
        } else {
            setOptions([])
        }
    }, [inputValue])

    useEffect(() => {
        const automcompleteResults = async () => {

            try {
                const response = await fetch(
                    `https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}&format=json&origin=*`
                )
                const [term, titles, descriptions, urls] = await response.json()
                setOptions(titles.map((x: string, i: number) => ({ value: urls[i], label: x })))
                console.log('AUTOCOMPLETE RESULTS', term, titles, descriptions, urls)
            } catch (error) {
                console.error(error)
            }

            setLoading(false)
        }

        if (query) automcompleteResults()
    }, [query])

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current
            if (!input) {
                return
            }

            // Keep the options displayed when the user is typing
            if (!isOpen) {
                setOpen(true)
            }

            // This is not a default behaviour of the <input /> field
            if (event.key === "Enter" && input.value !== "") {
                const optionToSelect = options.find(
                    (option) => option.label === input.value,
                )
                if (optionToSelect) {
                    setSelected(optionToSelect)
                    onValueChange?.(optionToSelect)
                }
            }

            if (event.key === "Escape") {
                input.blur()
            }
        },
        [isOpen, options, onValueChange],
    )

    const handleBlur = useCallback(() => {
        setOpen(false)
        setInputValue(selected?.label)
    }, [selected])

    const handleSelectOption = useCallback(
        (selectedOption: Option) => {
            setInputValue(selectedOption.label)

            setSelected(selectedOption)
            onValueChange?.(selectedOption)

            // This is a hack to prevent the input from being focused after the user selects an option
            // We can call this hack: "The next tick"
            setTimeout(() => {
                inputRef?.current?.blur()
            }, 0)
        },
        [onValueChange],
    )

    return (
        <CommandPrimitive onKeyDown={handleKeyDown}>
            <div>
                <CommandInput
                    ref={inputRef}
                    value={inputValue}
                    onValueChange={isLoading ? undefined : setInputValue}
                    onBlur={handleBlur}
                    onFocus={() => setOpen(true)}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="text-base"
                    isOpen={isOpen}
                />
            </div>
            <div className="relative mt-[-1px]">
                <CommandList
                    className={cn(
                        "border animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-md bg-white outline-none",
                        isOpen ? "block rounded-t-none" : "hidden",
                    )}
                >
                    {/* className="rounded-md ring-1 ring-slate-200"> */}
                    {isLoading ? (
                        <CommandPrimitive.Loading>
                            <div className="p-1">
                                <Skeleton className="h-8 w-full" />
                            </div>
                        </CommandPrimitive.Loading>
                    ) : null}
                    {options.length > 0 && !isLoading ? (
                        <CommandGroup>
                            {options.map((option) => {
                                const isSelected = selected?.value === option.value
                                return (
                                    <CommandItem
                                        key={option.value}
                                        value={option.label}
                                        onMouseDown={(event) => {
                                            event.preventDefault()
                                            event.stopPropagation()
                                        }}
                                        onSelect={() => handleSelectOption(option)}
                                        className={cn(
                                            "flex w-full items-center gap-2",
                                            // !isSelected ? "pl-8" : null,
                                        )}
                                    >
                                        {/* {isSelected ? <Check className="w-4" /> : null} */}
                                        {option.label}
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    ) : null}
                    {!isLoading ? (
                        <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm text-muted-foreground">
                            {emptyMessage}
                        </CommandPrimitive.Empty>
                    ) : <LoadingSpinner />}
                </CommandList>
            </div>
        </CommandPrimitive>
    )
}
