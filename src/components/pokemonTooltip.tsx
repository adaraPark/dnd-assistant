import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type tooltipButtonProps = React.ComponentProps<typeof Button> & {
  onClick: () => void;
  label: string;
};

export function PokemonTooltip({
  children,
  buttonProps,
}: {
  children: React.ReactNode;
  buttonProps: tooltipButtonProps;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button {...buttonProps}>{buttonProps.label}</Button>
        </TooltipTrigger>
        <TooltipContent>{children}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
