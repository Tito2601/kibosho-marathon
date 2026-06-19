import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/** Small uppercase mono label above headings (blueprint §3). */
export function Eyebrow({ children, className = "", style }: Props) {
  return (
    <p className={`eyebrow${className ? ` ${className}` : ""}`} style={style}>
      {children}
    </p>
  );
}
