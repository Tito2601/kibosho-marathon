import type { ComponentProps, ReactNode } from "react";

type Variant = "vital" | "ghost";

type AnchorProps = ComponentProps<"a"> & {
  as?: "a";
  variant?: Variant;
  children: ReactNode;
};
type ButtonProps = ComponentProps<"button"> & {
  as: "button";
  variant?: Variant;
  children: ReactNode;
};

type Props = AnchorProps | ButtonProps;

/**
 * Brand button (blueprint §4). Renders as <a> by default (most CTAs are
 * in-page anchors) or as <button> for interactive stubs.
 */
export function Button({ variant = "vital", className = "", children, ...rest }: Props) {
  const cls = `btn btn-${variant}${className ? ` ${className}` : ""}`;

  if (rest.as === "button") {
    const { as: _as, ...buttonRest } = rest as ButtonProps;
    return (
      <button className={cls} {...buttonRest}>
        {children}
      </button>
    );
  }

  const { as: _as, ...anchorRest } = rest as AnchorProps;
  return (
    <a className={cls} {...anchorRest}>
      {children}
    </a>
  );
}
