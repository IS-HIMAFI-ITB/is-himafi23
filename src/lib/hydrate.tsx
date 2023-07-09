import { Hydrate as Hydraton, HydrateProps } from "@tanstack/react-query";

export function Hydrate({ children, ...props }: HydrateProps) {
  return <Hydraton {...props}>{children}</Hydraton>;
}
