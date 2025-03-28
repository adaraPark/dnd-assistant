"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "app/lib/utils";
import { Button } from "app/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "app/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "app/components/ui/popover";

type ComboBoxItem = {
  id: number;
  label: string;
};

export function Combobox({
  data,
  label,
  onSelect,
}: {
  data: ComboBoxItem[];
  label?: string;
  onSelect: (val: ComboBoxItem) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<ComboBoxItem | null>(
    null,
  );

  const unselectedDisplay = label ?? "Select ...";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between text-black"
        >
          {selectedItem ? selectedItem.label : unselectedDisplay}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.id}
                  id={item.label}
                  onSelect={() => {
                    onSelect(item);
                    setSelectedItem(item);
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedItem?.id === item.id
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
