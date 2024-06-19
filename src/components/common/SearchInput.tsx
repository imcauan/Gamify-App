import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import React from "react"

interface SearchInputProps extends React.ComponentPropsWithRef<"input"> {}

const SearchInput = ({ ...props }: SearchInputProps) => {
  return (
    <div className="flex w-full flex-row">
      <Search className="h-6 w-6 text-white absolute box-border mx-2 p-1 mt-2"/>
      <Input 
        {...props}
        className="bg-zinc-900 placeholder-white border-none px-9 text-white"
        placeholder="Search"
      />
    </div>
  )
}

export default SearchInput