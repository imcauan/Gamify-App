
import { Input } from "@/components/ui/input"
import React from "react"

interface SearchInputProps extends React.ComponentPropsWithRef<"input"> {}

const SearchInput = ({ ...props }: SearchInputProps) => {
  return (
    <Input 
    {...props}
      className="bg-zinc-900 border-none p-3"
    />
  )
}

export default SearchInput