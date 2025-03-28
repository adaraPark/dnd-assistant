import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "app/components/ui/select";

type DropDownSelectItem = {
  id: string;
  label: string;
};

export function DropDownSelect({
  data,
  label,
  onSelect,
}: {
  data: DropDownSelectItem[];
  label?: string;
  onSelect: (value: string) => void;
}) {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={label ?? "Select..."} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label ?? "Select..."}</SelectLabel>
          {data.map((item) => (
            <SelectItem
              key={item.id}
              value={item.id}
              onClick={() => {
                onSelect(item.id);
              }}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
