export const breakpoints = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl"
] as const;
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Brand = 'neutral' | 'slate';
export type Mode = 'light' | 'dark';
export type ScopeMode = Mode | 'inverse';
export const defaultBrand: Brand = 'neutral';
export const defaultMode: Mode = 'light';
export type SpaceStep = 'none' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type MotionStep = 'none' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type DwellStep = 'short' | 'medium' | 'long';
export type TypographyVariant = 'display-sm' | 'display-md' | 'display-lg' | 'headline-sm' | 'headline-md' | 'headline-lg' | 'title-sm' | 'title-md' | 'title-lg' | 'body-sm' | 'body-md' | 'body-lg' | 'label-sm' | 'label-md' | 'label-lg';
export type TextColor = 'primary-default' | 'on-primary-default' | 'on-primary-container-default' | 'secondary-default' | 'on-secondary-default' | 'on-secondary-container-default' | 'error-default' | 'on-error-default' | 'on-error-container-default' | 'warning-default' | 'on-warning-default' | 'on-warning-container-default' | 'info-default' | 'on-info-default' | 'on-info-container-default' | 'success-default' | 'on-success-default' | 'on-success-container-default' | 'tertiary-default' | 'on-tertiary-default' | 'on-tertiary-container-default' | 'on-surface-default' | 'on-surface-disabled' | 'on-surface-variant-default';
export type IconSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type ControlInnerSize = '2xs' | 'xs' | 'sm' | 'md';
export type ContainerWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ByBreakpoint = Readonly<Record<Breakpoint, string>>;
export type ComponentMap = {
  readonly slots: Readonly<Record<string, string>>;
  readonly variants: Readonly<Record<string, Readonly<Record<string, string | null>>>>;
  readonly sizes: Readonly<Record<string, ByBreakpoint | null>>;
  readonly styleSizes?: Readonly<Record<string, Readonly<Record<string, ByBreakpoint | null>>>>;
  readonly childProps: Readonly<Record<string, unknown>>;
};
export const layout = {
  "padding": {
    "p": {
      "none": {
        "xs": "p-none",
        "sm": "sm:p-none",
        "md": "md:p-none",
        "lg": "lg:p-none",
        "xl": "xl:p-none"
      },
      "2xs": {
        "xs": "p-2xs",
        "sm": "sm:p-2xs",
        "md": "md:p-2xs",
        "lg": "lg:p-2xs",
        "xl": "xl:p-2xs"
      },
      "xs": {
        "xs": "p-xs",
        "sm": "sm:p-xs",
        "md": "md:p-xs",
        "lg": "lg:p-xs",
        "xl": "xl:p-xs"
      },
      "sm": {
        "xs": "p-sm",
        "sm": "sm:p-sm",
        "md": "md:p-sm",
        "lg": "lg:p-sm",
        "xl": "xl:p-sm"
      },
      "md": {
        "xs": "p-md",
        "sm": "sm:p-md",
        "md": "md:p-md",
        "lg": "lg:p-md",
        "xl": "xl:p-md"
      },
      "lg": {
        "xs": "p-lg",
        "sm": "sm:p-lg",
        "md": "md:p-lg",
        "lg": "lg:p-lg",
        "xl": "xl:p-lg"
      },
      "xl": {
        "xs": "p-xl",
        "sm": "sm:p-xl",
        "md": "md:p-xl",
        "lg": "lg:p-xl",
        "xl": "xl:p-xl"
      },
      "2xl": {
        "xs": "p-2xl",
        "sm": "sm:p-2xl",
        "md": "md:p-2xl",
        "lg": "lg:p-2xl",
        "xl": "xl:p-2xl"
      },
      "3xl": {
        "xs": "p-3xl",
        "sm": "sm:p-3xl",
        "md": "md:p-3xl",
        "lg": "lg:p-3xl",
        "xl": "xl:p-3xl"
      }
    },
    "px": {
      "none": {
        "xs": "px-none",
        "sm": "sm:px-none",
        "md": "md:px-none",
        "lg": "lg:px-none",
        "xl": "xl:px-none"
      },
      "2xs": {
        "xs": "px-2xs",
        "sm": "sm:px-2xs",
        "md": "md:px-2xs",
        "lg": "lg:px-2xs",
        "xl": "xl:px-2xs"
      },
      "xs": {
        "xs": "px-xs",
        "sm": "sm:px-xs",
        "md": "md:px-xs",
        "lg": "lg:px-xs",
        "xl": "xl:px-xs"
      },
      "sm": {
        "xs": "px-sm",
        "sm": "sm:px-sm",
        "md": "md:px-sm",
        "lg": "lg:px-sm",
        "xl": "xl:px-sm"
      },
      "md": {
        "xs": "px-md",
        "sm": "sm:px-md",
        "md": "md:px-md",
        "lg": "lg:px-md",
        "xl": "xl:px-md"
      },
      "lg": {
        "xs": "px-lg",
        "sm": "sm:px-lg",
        "md": "md:px-lg",
        "lg": "lg:px-lg",
        "xl": "xl:px-lg"
      },
      "xl": {
        "xs": "px-xl",
        "sm": "sm:px-xl",
        "md": "md:px-xl",
        "lg": "lg:px-xl",
        "xl": "xl:px-xl"
      },
      "2xl": {
        "xs": "px-2xl",
        "sm": "sm:px-2xl",
        "md": "md:px-2xl",
        "lg": "lg:px-2xl",
        "xl": "xl:px-2xl"
      },
      "3xl": {
        "xs": "px-3xl",
        "sm": "sm:px-3xl",
        "md": "md:px-3xl",
        "lg": "lg:px-3xl",
        "xl": "xl:px-3xl"
      }
    },
    "py": {
      "none": {
        "xs": "py-none",
        "sm": "sm:py-none",
        "md": "md:py-none",
        "lg": "lg:py-none",
        "xl": "xl:py-none"
      },
      "2xs": {
        "xs": "py-2xs",
        "sm": "sm:py-2xs",
        "md": "md:py-2xs",
        "lg": "lg:py-2xs",
        "xl": "xl:py-2xs"
      },
      "xs": {
        "xs": "py-xs",
        "sm": "sm:py-xs",
        "md": "md:py-xs",
        "lg": "lg:py-xs",
        "xl": "xl:py-xs"
      },
      "sm": {
        "xs": "py-sm",
        "sm": "sm:py-sm",
        "md": "md:py-sm",
        "lg": "lg:py-sm",
        "xl": "xl:py-sm"
      },
      "md": {
        "xs": "py-md",
        "sm": "sm:py-md",
        "md": "md:py-md",
        "lg": "lg:py-md",
        "xl": "xl:py-md"
      },
      "lg": {
        "xs": "py-lg",
        "sm": "sm:py-lg",
        "md": "md:py-lg",
        "lg": "lg:py-lg",
        "xl": "xl:py-lg"
      },
      "xl": {
        "xs": "py-xl",
        "sm": "sm:py-xl",
        "md": "md:py-xl",
        "lg": "lg:py-xl",
        "xl": "xl:py-xl"
      },
      "2xl": {
        "xs": "py-2xl",
        "sm": "sm:py-2xl",
        "md": "md:py-2xl",
        "lg": "lg:py-2xl",
        "xl": "xl:py-2xl"
      },
      "3xl": {
        "xs": "py-3xl",
        "sm": "sm:py-3xl",
        "md": "md:py-3xl",
        "lg": "lg:py-3xl",
        "xl": "xl:py-3xl"
      }
    },
    "pt": {
      "none": {
        "xs": "pt-none",
        "sm": "sm:pt-none",
        "md": "md:pt-none",
        "lg": "lg:pt-none",
        "xl": "xl:pt-none"
      },
      "2xs": {
        "xs": "pt-2xs",
        "sm": "sm:pt-2xs",
        "md": "md:pt-2xs",
        "lg": "lg:pt-2xs",
        "xl": "xl:pt-2xs"
      },
      "xs": {
        "xs": "pt-xs",
        "sm": "sm:pt-xs",
        "md": "md:pt-xs",
        "lg": "lg:pt-xs",
        "xl": "xl:pt-xs"
      },
      "sm": {
        "xs": "pt-sm",
        "sm": "sm:pt-sm",
        "md": "md:pt-sm",
        "lg": "lg:pt-sm",
        "xl": "xl:pt-sm"
      },
      "md": {
        "xs": "pt-md",
        "sm": "sm:pt-md",
        "md": "md:pt-md",
        "lg": "lg:pt-md",
        "xl": "xl:pt-md"
      },
      "lg": {
        "xs": "pt-lg",
        "sm": "sm:pt-lg",
        "md": "md:pt-lg",
        "lg": "lg:pt-lg",
        "xl": "xl:pt-lg"
      },
      "xl": {
        "xs": "pt-xl",
        "sm": "sm:pt-xl",
        "md": "md:pt-xl",
        "lg": "lg:pt-xl",
        "xl": "xl:pt-xl"
      },
      "2xl": {
        "xs": "pt-2xl",
        "sm": "sm:pt-2xl",
        "md": "md:pt-2xl",
        "lg": "lg:pt-2xl",
        "xl": "xl:pt-2xl"
      },
      "3xl": {
        "xs": "pt-3xl",
        "sm": "sm:pt-3xl",
        "md": "md:pt-3xl",
        "lg": "lg:pt-3xl",
        "xl": "xl:pt-3xl"
      }
    },
    "pr": {
      "none": {
        "xs": "pr-none",
        "sm": "sm:pr-none",
        "md": "md:pr-none",
        "lg": "lg:pr-none",
        "xl": "xl:pr-none"
      },
      "2xs": {
        "xs": "pr-2xs",
        "sm": "sm:pr-2xs",
        "md": "md:pr-2xs",
        "lg": "lg:pr-2xs",
        "xl": "xl:pr-2xs"
      },
      "xs": {
        "xs": "pr-xs",
        "sm": "sm:pr-xs",
        "md": "md:pr-xs",
        "lg": "lg:pr-xs",
        "xl": "xl:pr-xs"
      },
      "sm": {
        "xs": "pr-sm",
        "sm": "sm:pr-sm",
        "md": "md:pr-sm",
        "lg": "lg:pr-sm",
        "xl": "xl:pr-sm"
      },
      "md": {
        "xs": "pr-md",
        "sm": "sm:pr-md",
        "md": "md:pr-md",
        "lg": "lg:pr-md",
        "xl": "xl:pr-md"
      },
      "lg": {
        "xs": "pr-lg",
        "sm": "sm:pr-lg",
        "md": "md:pr-lg",
        "lg": "lg:pr-lg",
        "xl": "xl:pr-lg"
      },
      "xl": {
        "xs": "pr-xl",
        "sm": "sm:pr-xl",
        "md": "md:pr-xl",
        "lg": "lg:pr-xl",
        "xl": "xl:pr-xl"
      },
      "2xl": {
        "xs": "pr-2xl",
        "sm": "sm:pr-2xl",
        "md": "md:pr-2xl",
        "lg": "lg:pr-2xl",
        "xl": "xl:pr-2xl"
      },
      "3xl": {
        "xs": "pr-3xl",
        "sm": "sm:pr-3xl",
        "md": "md:pr-3xl",
        "lg": "lg:pr-3xl",
        "xl": "xl:pr-3xl"
      }
    },
    "pb": {
      "none": {
        "xs": "pb-none",
        "sm": "sm:pb-none",
        "md": "md:pb-none",
        "lg": "lg:pb-none",
        "xl": "xl:pb-none"
      },
      "2xs": {
        "xs": "pb-2xs",
        "sm": "sm:pb-2xs",
        "md": "md:pb-2xs",
        "lg": "lg:pb-2xs",
        "xl": "xl:pb-2xs"
      },
      "xs": {
        "xs": "pb-xs",
        "sm": "sm:pb-xs",
        "md": "md:pb-xs",
        "lg": "lg:pb-xs",
        "xl": "xl:pb-xs"
      },
      "sm": {
        "xs": "pb-sm",
        "sm": "sm:pb-sm",
        "md": "md:pb-sm",
        "lg": "lg:pb-sm",
        "xl": "xl:pb-sm"
      },
      "md": {
        "xs": "pb-md",
        "sm": "sm:pb-md",
        "md": "md:pb-md",
        "lg": "lg:pb-md",
        "xl": "xl:pb-md"
      },
      "lg": {
        "xs": "pb-lg",
        "sm": "sm:pb-lg",
        "md": "md:pb-lg",
        "lg": "lg:pb-lg",
        "xl": "xl:pb-lg"
      },
      "xl": {
        "xs": "pb-xl",
        "sm": "sm:pb-xl",
        "md": "md:pb-xl",
        "lg": "lg:pb-xl",
        "xl": "xl:pb-xl"
      },
      "2xl": {
        "xs": "pb-2xl",
        "sm": "sm:pb-2xl",
        "md": "md:pb-2xl",
        "lg": "lg:pb-2xl",
        "xl": "xl:pb-2xl"
      },
      "3xl": {
        "xs": "pb-3xl",
        "sm": "sm:pb-3xl",
        "md": "md:pb-3xl",
        "lg": "lg:pb-3xl",
        "xl": "xl:pb-3xl"
      }
    },
    "pl": {
      "none": {
        "xs": "pl-none",
        "sm": "sm:pl-none",
        "md": "md:pl-none",
        "lg": "lg:pl-none",
        "xl": "xl:pl-none"
      },
      "2xs": {
        "xs": "pl-2xs",
        "sm": "sm:pl-2xs",
        "md": "md:pl-2xs",
        "lg": "lg:pl-2xs",
        "xl": "xl:pl-2xs"
      },
      "xs": {
        "xs": "pl-xs",
        "sm": "sm:pl-xs",
        "md": "md:pl-xs",
        "lg": "lg:pl-xs",
        "xl": "xl:pl-xs"
      },
      "sm": {
        "xs": "pl-sm",
        "sm": "sm:pl-sm",
        "md": "md:pl-sm",
        "lg": "lg:pl-sm",
        "xl": "xl:pl-sm"
      },
      "md": {
        "xs": "pl-md",
        "sm": "sm:pl-md",
        "md": "md:pl-md",
        "lg": "lg:pl-md",
        "xl": "xl:pl-md"
      },
      "lg": {
        "xs": "pl-lg",
        "sm": "sm:pl-lg",
        "md": "md:pl-lg",
        "lg": "lg:pl-lg",
        "xl": "xl:pl-lg"
      },
      "xl": {
        "xs": "pl-xl",
        "sm": "sm:pl-xl",
        "md": "md:pl-xl",
        "lg": "lg:pl-xl",
        "xl": "xl:pl-xl"
      },
      "2xl": {
        "xs": "pl-2xl",
        "sm": "sm:pl-2xl",
        "md": "md:pl-2xl",
        "lg": "lg:pl-2xl",
        "xl": "xl:pl-2xl"
      },
      "3xl": {
        "xs": "pl-3xl",
        "sm": "sm:pl-3xl",
        "md": "md:pl-3xl",
        "lg": "lg:pl-3xl",
        "xl": "xl:pl-3xl"
      }
    }
  },
  "gap": {
    "gap": {
      "none": {
        "xs": "gap-none",
        "sm": "sm:gap-none",
        "md": "md:gap-none",
        "lg": "lg:gap-none",
        "xl": "xl:gap-none"
      },
      "2xs": {
        "xs": "gap-2xs",
        "sm": "sm:gap-2xs",
        "md": "md:gap-2xs",
        "lg": "lg:gap-2xs",
        "xl": "xl:gap-2xs"
      },
      "xs": {
        "xs": "gap-xs",
        "sm": "sm:gap-xs",
        "md": "md:gap-xs",
        "lg": "lg:gap-xs",
        "xl": "xl:gap-xs"
      },
      "sm": {
        "xs": "gap-sm",
        "sm": "sm:gap-sm",
        "md": "md:gap-sm",
        "lg": "lg:gap-sm",
        "xl": "xl:gap-sm"
      },
      "md": {
        "xs": "gap-md",
        "sm": "sm:gap-md",
        "md": "md:gap-md",
        "lg": "lg:gap-md",
        "xl": "xl:gap-md"
      },
      "lg": {
        "xs": "gap-lg",
        "sm": "sm:gap-lg",
        "md": "md:gap-lg",
        "lg": "lg:gap-lg",
        "xl": "xl:gap-lg"
      },
      "xl": {
        "xs": "gap-xl",
        "sm": "sm:gap-xl",
        "md": "md:gap-xl",
        "lg": "lg:gap-xl",
        "xl": "xl:gap-xl"
      },
      "2xl": {
        "xs": "gap-2xl",
        "sm": "sm:gap-2xl",
        "md": "md:gap-2xl",
        "lg": "lg:gap-2xl",
        "xl": "xl:gap-2xl"
      },
      "3xl": {
        "xs": "gap-3xl",
        "sm": "sm:gap-3xl",
        "md": "md:gap-3xl",
        "lg": "lg:gap-3xl",
        "xl": "xl:gap-3xl"
      }
    },
    "gap-x": {
      "none": {
        "xs": "gap-x-none",
        "sm": "sm:gap-x-none",
        "md": "md:gap-x-none",
        "lg": "lg:gap-x-none",
        "xl": "xl:gap-x-none"
      },
      "2xs": {
        "xs": "gap-x-2xs",
        "sm": "sm:gap-x-2xs",
        "md": "md:gap-x-2xs",
        "lg": "lg:gap-x-2xs",
        "xl": "xl:gap-x-2xs"
      },
      "xs": {
        "xs": "gap-x-xs",
        "sm": "sm:gap-x-xs",
        "md": "md:gap-x-xs",
        "lg": "lg:gap-x-xs",
        "xl": "xl:gap-x-xs"
      },
      "sm": {
        "xs": "gap-x-sm",
        "sm": "sm:gap-x-sm",
        "md": "md:gap-x-sm",
        "lg": "lg:gap-x-sm",
        "xl": "xl:gap-x-sm"
      },
      "md": {
        "xs": "gap-x-md",
        "sm": "sm:gap-x-md",
        "md": "md:gap-x-md",
        "lg": "lg:gap-x-md",
        "xl": "xl:gap-x-md"
      },
      "lg": {
        "xs": "gap-x-lg",
        "sm": "sm:gap-x-lg",
        "md": "md:gap-x-lg",
        "lg": "lg:gap-x-lg",
        "xl": "xl:gap-x-lg"
      },
      "xl": {
        "xs": "gap-x-xl",
        "sm": "sm:gap-x-xl",
        "md": "md:gap-x-xl",
        "lg": "lg:gap-x-xl",
        "xl": "xl:gap-x-xl"
      },
      "2xl": {
        "xs": "gap-x-2xl",
        "sm": "sm:gap-x-2xl",
        "md": "md:gap-x-2xl",
        "lg": "lg:gap-x-2xl",
        "xl": "xl:gap-x-2xl"
      },
      "3xl": {
        "xs": "gap-x-3xl",
        "sm": "sm:gap-x-3xl",
        "md": "md:gap-x-3xl",
        "lg": "lg:gap-x-3xl",
        "xl": "xl:gap-x-3xl"
      }
    },
    "gap-y": {
      "none": {
        "xs": "gap-y-none",
        "sm": "sm:gap-y-none",
        "md": "md:gap-y-none",
        "lg": "lg:gap-y-none",
        "xl": "xl:gap-y-none"
      },
      "2xs": {
        "xs": "gap-y-2xs",
        "sm": "sm:gap-y-2xs",
        "md": "md:gap-y-2xs",
        "lg": "lg:gap-y-2xs",
        "xl": "xl:gap-y-2xs"
      },
      "xs": {
        "xs": "gap-y-xs",
        "sm": "sm:gap-y-xs",
        "md": "md:gap-y-xs",
        "lg": "lg:gap-y-xs",
        "xl": "xl:gap-y-xs"
      },
      "sm": {
        "xs": "gap-y-sm",
        "sm": "sm:gap-y-sm",
        "md": "md:gap-y-sm",
        "lg": "lg:gap-y-sm",
        "xl": "xl:gap-y-sm"
      },
      "md": {
        "xs": "gap-y-md",
        "sm": "sm:gap-y-md",
        "md": "md:gap-y-md",
        "lg": "lg:gap-y-md",
        "xl": "xl:gap-y-md"
      },
      "lg": {
        "xs": "gap-y-lg",
        "sm": "sm:gap-y-lg",
        "md": "md:gap-y-lg",
        "lg": "lg:gap-y-lg",
        "xl": "xl:gap-y-lg"
      },
      "xl": {
        "xs": "gap-y-xl",
        "sm": "sm:gap-y-xl",
        "md": "md:gap-y-xl",
        "lg": "lg:gap-y-xl",
        "xl": "xl:gap-y-xl"
      },
      "2xl": {
        "xs": "gap-y-2xl",
        "sm": "sm:gap-y-2xl",
        "md": "md:gap-y-2xl",
        "lg": "lg:gap-y-2xl",
        "xl": "xl:gap-y-2xl"
      },
      "3xl": {
        "xs": "gap-y-3xl",
        "sm": "sm:gap-y-3xl",
        "md": "md:gap-y-3xl",
        "lg": "lg:gap-y-3xl",
        "xl": "xl:gap-y-3xl"
      }
    }
  },
  "display": {
    "none": {
      "xs": "hidden",
      "sm": "sm:hidden",
      "md": "md:hidden",
      "lg": "lg:hidden",
      "xl": "xl:hidden"
    },
    "block": {
      "xs": "block",
      "sm": "sm:block",
      "md": "md:block",
      "lg": "lg:block",
      "xl": "xl:block"
    },
    "flex": {
      "xs": "flex",
      "sm": "sm:flex",
      "md": "md:flex",
      "lg": "lg:flex",
      "xl": "xl:flex"
    },
    "inline-flex": {
      "xs": "inline-flex",
      "sm": "sm:inline-flex",
      "md": "md:inline-flex",
      "lg": "lg:inline-flex",
      "xl": "xl:inline-flex"
    },
    "grid": {
      "xs": "grid",
      "sm": "sm:grid",
      "md": "md:grid",
      "lg": "lg:grid",
      "xl": "xl:grid"
    },
    "inline-grid": {
      "xs": "inline-grid",
      "sm": "sm:inline-grid",
      "md": "md:inline-grid",
      "lg": "lg:inline-grid",
      "xl": "xl:inline-grid"
    }
  },
  "direction": {
    "row": {
      "xs": "flex-row",
      "sm": "sm:flex-row",
      "md": "md:flex-row",
      "lg": "lg:flex-row",
      "xl": "xl:flex-row"
    },
    "column": {
      "xs": "flex-col",
      "sm": "sm:flex-col",
      "md": "md:flex-col",
      "lg": "lg:flex-col",
      "xl": "xl:flex-col"
    },
    "row-reverse": {
      "xs": "flex-row-reverse",
      "sm": "sm:flex-row-reverse",
      "md": "md:flex-row-reverse",
      "lg": "lg:flex-row-reverse",
      "xl": "xl:flex-row-reverse"
    },
    "column-reverse": {
      "xs": "flex-col-reverse",
      "sm": "sm:flex-col-reverse",
      "md": "md:flex-col-reverse",
      "lg": "lg:flex-col-reverse",
      "xl": "xl:flex-col-reverse"
    }
  },
  "alignItems": {
    "flex-start": {
      "xs": "items-start",
      "sm": "sm:items-start",
      "md": "md:items-start",
      "lg": "lg:items-start",
      "xl": "xl:items-start"
    },
    "flex-end": {
      "xs": "items-end",
      "sm": "sm:items-end",
      "md": "md:items-end",
      "lg": "lg:items-end",
      "xl": "xl:items-end"
    },
    "center": {
      "xs": "items-center",
      "sm": "sm:items-center",
      "md": "md:items-center",
      "lg": "lg:items-center",
      "xl": "xl:items-center"
    },
    "stretch": {
      "xs": "items-stretch",
      "sm": "sm:items-stretch",
      "md": "md:items-stretch",
      "lg": "lg:items-stretch",
      "xl": "xl:items-stretch"
    },
    "baseline": {
      "xs": "items-baseline",
      "sm": "sm:items-baseline",
      "md": "md:items-baseline",
      "lg": "lg:items-baseline",
      "xl": "xl:items-baseline"
    }
  },
  "justifyContent": {
    "flex-start": {
      "xs": "justify-start",
      "sm": "sm:justify-start",
      "md": "md:justify-start",
      "lg": "lg:justify-start",
      "xl": "xl:justify-start"
    },
    "flex-end": {
      "xs": "justify-end",
      "sm": "sm:justify-end",
      "md": "md:justify-end",
      "lg": "lg:justify-end",
      "xl": "xl:justify-end"
    },
    "center": {
      "xs": "justify-center",
      "sm": "sm:justify-center",
      "md": "md:justify-center",
      "lg": "lg:justify-center",
      "xl": "xl:justify-center"
    },
    "space-between": {
      "xs": "justify-between",
      "sm": "sm:justify-between",
      "md": "md:justify-between",
      "lg": "lg:justify-between",
      "xl": "xl:justify-between"
    },
    "space-around": {
      "xs": "justify-around",
      "sm": "sm:justify-around",
      "md": "md:justify-around",
      "lg": "lg:justify-around",
      "xl": "xl:justify-around"
    },
    "space-evenly": {
      "xs": "justify-evenly",
      "sm": "sm:justify-evenly",
      "md": "md:justify-evenly",
      "lg": "lg:justify-evenly",
      "xl": "xl:justify-evenly"
    }
  },
  "flexGrow": {
    "0": {
      "xs": "grow-0",
      "sm": "sm:grow-0",
      "md": "md:grow-0",
      "lg": "lg:grow-0",
      "xl": "xl:grow-0"
    },
    "1": {
      "xs": "grow",
      "sm": "sm:grow",
      "md": "md:grow",
      "lg": "lg:grow",
      "xl": "xl:grow"
    }
  },
  "minHeight": {
    "auto": {
      "xs": "min-h-auto",
      "sm": "sm:min-h-auto",
      "md": "md:min-h-auto",
      "lg": "lg:min-h-auto",
      "xl": "xl:min-h-auto"
    },
    "viewport": {
      "xs": "min-h-dvh",
      "sm": "sm:min-h-dvh",
      "md": "md:min-h-dvh",
      "lg": "lg:min-h-dvh",
      "xl": "xl:min-h-dvh"
    }
  },
  "textAlign": {
    "left": {
      "xs": "text-left",
      "sm": "sm:text-left",
      "md": "md:text-left",
      "lg": "lg:text-left",
      "xl": "xl:text-left"
    },
    "center": {
      "xs": "text-center",
      "sm": "sm:text-center",
      "md": "md:text-center",
      "lg": "lg:text-center",
      "xl": "xl:text-center"
    },
    "right": {
      "xs": "text-right",
      "sm": "sm:text-right",
      "md": "md:text-right",
      "lg": "lg:text-right",
      "xl": "xl:text-right"
    },
    "justify": {
      "xs": "text-justify",
      "sm": "sm:text-justify",
      "md": "md:text-justify",
      "lg": "lg:text-justify",
      "xl": "xl:text-justify"
    }
  },
  "columns": {
    "1": {
      "xs": "grid-cols-1",
      "sm": "sm:grid-cols-1",
      "md": "md:grid-cols-1",
      "lg": "lg:grid-cols-1",
      "xl": "xl:grid-cols-1"
    },
    "2": {
      "xs": "grid-cols-2",
      "sm": "sm:grid-cols-2",
      "md": "md:grid-cols-2",
      "lg": "lg:grid-cols-2",
      "xl": "xl:grid-cols-2"
    },
    "3": {
      "xs": "grid-cols-3",
      "sm": "sm:grid-cols-3",
      "md": "md:grid-cols-3",
      "lg": "lg:grid-cols-3",
      "xl": "xl:grid-cols-3"
    },
    "4": {
      "xs": "grid-cols-4",
      "sm": "sm:grid-cols-4",
      "md": "md:grid-cols-4",
      "lg": "lg:grid-cols-4",
      "xl": "xl:grid-cols-4"
    },
    "5": {
      "xs": "grid-cols-5",
      "sm": "sm:grid-cols-5",
      "md": "md:grid-cols-5",
      "lg": "lg:grid-cols-5",
      "xl": "xl:grid-cols-5"
    },
    "6": {
      "xs": "grid-cols-6",
      "sm": "sm:grid-cols-6",
      "md": "md:grid-cols-6",
      "lg": "lg:grid-cols-6",
      "xl": "xl:grid-cols-6"
    },
    "7": {
      "xs": "grid-cols-7",
      "sm": "sm:grid-cols-7",
      "md": "md:grid-cols-7",
      "lg": "lg:grid-cols-7",
      "xl": "xl:grid-cols-7"
    },
    "8": {
      "xs": "grid-cols-8",
      "sm": "sm:grid-cols-8",
      "md": "md:grid-cols-8",
      "lg": "lg:grid-cols-8",
      "xl": "xl:grid-cols-8"
    },
    "9": {
      "xs": "grid-cols-9",
      "sm": "sm:grid-cols-9",
      "md": "md:grid-cols-9",
      "lg": "lg:grid-cols-9",
      "xl": "xl:grid-cols-9"
    },
    "10": {
      "xs": "grid-cols-10",
      "sm": "sm:grid-cols-10",
      "md": "md:grid-cols-10",
      "lg": "lg:grid-cols-10",
      "xl": "xl:grid-cols-10"
    },
    "11": {
      "xs": "grid-cols-11",
      "sm": "sm:grid-cols-11",
      "md": "md:grid-cols-11",
      "lg": "lg:grid-cols-11",
      "xl": "xl:grid-cols-11"
    },
    "12": {
      "xs": "grid-cols-12",
      "sm": "sm:grid-cols-12",
      "md": "md:grid-cols-12",
      "lg": "lg:grid-cols-12",
      "xl": "xl:grid-cols-12"
    }
  },
  "span": {
    "1": {
      "xs": "col-span-1",
      "sm": "sm:col-span-1",
      "md": "md:col-span-1",
      "lg": "lg:col-span-1",
      "xl": "xl:col-span-1"
    },
    "2": {
      "xs": "col-span-2",
      "sm": "sm:col-span-2",
      "md": "md:col-span-2",
      "lg": "lg:col-span-2",
      "xl": "xl:col-span-2"
    },
    "3": {
      "xs": "col-span-3",
      "sm": "sm:col-span-3",
      "md": "md:col-span-3",
      "lg": "lg:col-span-3",
      "xl": "xl:col-span-3"
    },
    "4": {
      "xs": "col-span-4",
      "sm": "sm:col-span-4",
      "md": "md:col-span-4",
      "lg": "lg:col-span-4",
      "xl": "xl:col-span-4"
    },
    "5": {
      "xs": "col-span-5",
      "sm": "sm:col-span-5",
      "md": "md:col-span-5",
      "lg": "lg:col-span-5",
      "xl": "xl:col-span-5"
    },
    "6": {
      "xs": "col-span-6",
      "sm": "sm:col-span-6",
      "md": "md:col-span-6",
      "lg": "lg:col-span-6",
      "xl": "xl:col-span-6"
    },
    "7": {
      "xs": "col-span-7",
      "sm": "sm:col-span-7",
      "md": "md:col-span-7",
      "lg": "lg:col-span-7",
      "xl": "xl:col-span-7"
    },
    "8": {
      "xs": "col-span-8",
      "sm": "sm:col-span-8",
      "md": "md:col-span-8",
      "lg": "lg:col-span-8",
      "xl": "xl:col-span-8"
    },
    "9": {
      "xs": "col-span-9",
      "sm": "sm:col-span-9",
      "md": "md:col-span-9",
      "lg": "lg:col-span-9",
      "xl": "xl:col-span-9"
    },
    "10": {
      "xs": "col-span-10",
      "sm": "sm:col-span-10",
      "md": "md:col-span-10",
      "lg": "lg:col-span-10",
      "xl": "xl:col-span-10"
    },
    "11": {
      "xs": "col-span-11",
      "sm": "sm:col-span-11",
      "md": "md:col-span-11",
      "lg": "lg:col-span-11",
      "xl": "xl:col-span-11"
    },
    "12": {
      "xs": "col-span-12",
      "sm": "sm:col-span-12",
      "md": "md:col-span-12",
      "lg": "lg:col-span-12",
      "xl": "xl:col-span-12"
    }
  },
  "offset": {
    "0": {
      "xs": "col-start-auto",
      "sm": "sm:col-start-auto",
      "md": "md:col-start-auto",
      "lg": "lg:col-start-auto",
      "xl": "xl:col-start-auto"
    },
    "1": {
      "xs": "col-start-2",
      "sm": "sm:col-start-2",
      "md": "md:col-start-2",
      "lg": "lg:col-start-2",
      "xl": "xl:col-start-2"
    },
    "2": {
      "xs": "col-start-3",
      "sm": "sm:col-start-3",
      "md": "md:col-start-3",
      "lg": "lg:col-start-3",
      "xl": "xl:col-start-3"
    },
    "3": {
      "xs": "col-start-4",
      "sm": "sm:col-start-4",
      "md": "md:col-start-4",
      "lg": "lg:col-start-4",
      "xl": "xl:col-start-4"
    },
    "4": {
      "xs": "col-start-5",
      "sm": "sm:col-start-5",
      "md": "md:col-start-5",
      "lg": "lg:col-start-5",
      "xl": "xl:col-start-5"
    },
    "5": {
      "xs": "col-start-6",
      "sm": "sm:col-start-6",
      "md": "md:col-start-6",
      "lg": "lg:col-start-6",
      "xl": "xl:col-start-6"
    },
    "6": {
      "xs": "col-start-7",
      "sm": "sm:col-start-7",
      "md": "md:col-start-7",
      "lg": "lg:col-start-7",
      "xl": "xl:col-start-7"
    },
    "7": {
      "xs": "col-start-8",
      "sm": "sm:col-start-8",
      "md": "md:col-start-8",
      "lg": "lg:col-start-8",
      "xl": "xl:col-start-8"
    },
    "8": {
      "xs": "col-start-9",
      "sm": "sm:col-start-9",
      "md": "md:col-start-9",
      "lg": "lg:col-start-9",
      "xl": "xl:col-start-9"
    },
    "9": {
      "xs": "col-start-10",
      "sm": "sm:col-start-10",
      "md": "md:col-start-10",
      "lg": "lg:col-start-10",
      "xl": "xl:col-start-10"
    },
    "10": {
      "xs": "col-start-11",
      "sm": "sm:col-start-11",
      "md": "md:col-start-11",
      "lg": "lg:col-start-11",
      "xl": "xl:col-start-11"
    },
    "11": {
      "xs": "col-start-12",
      "sm": "sm:col-start-12",
      "md": "md:col-start-12",
      "lg": "lg:col-start-12",
      "xl": "xl:col-start-12"
    }
  },
  "maxWidth": {
    "xs": {
      "xs": "max-w-xs",
      "sm": "sm:max-w-xs",
      "md": "md:max-w-xs",
      "lg": "lg:max-w-xs",
      "xl": "xl:max-w-xs"
    },
    "sm": {
      "xs": "max-w-sm",
      "sm": "sm:max-w-sm",
      "md": "md:max-w-sm",
      "lg": "lg:max-w-sm",
      "xl": "xl:max-w-sm"
    },
    "md": {
      "xs": "max-w-md",
      "sm": "sm:max-w-md",
      "md": "md:max-w-md",
      "lg": "lg:max-w-md",
      "xl": "xl:max-w-md"
    },
    "lg": {
      "xs": "max-w-lg",
      "sm": "sm:max-w-lg",
      "md": "md:max-w-lg",
      "lg": "lg:max-w-lg",
      "xl": "xl:max-w-lg"
    },
    "xl": {
      "xs": "max-w-xl",
      "sm": "sm:max-w-xl",
      "md": "md:max-w-xl",
      "lg": "lg:max-w-xl",
      "xl": "xl:max-w-xl"
    },
    "none": {
      "xs": "max-w-none",
      "sm": "sm:max-w-none",
      "md": "md:max-w-none",
      "lg": "lg:max-w-none",
      "xl": "xl:max-w-none"
    }
  },
  "fixed": {
    "xs": "vy-fixed-xs",
    "sm": "vy-fixed-sm",
    "md": "vy-fixed-md",
    "lg": "vy-fixed-lg",
    "xl": "vy-fixed-xl"
  },
  "typography": {
    "display-sm": {
      "xs": "text-display-sm font-display",
      "sm": "sm:text-display-sm sm:font-display",
      "md": "md:text-display-sm md:font-display",
      "lg": "lg:text-display-sm lg:font-display",
      "xl": "xl:text-display-sm xl:font-display"
    },
    "display-md": {
      "xs": "text-display-md font-display",
      "sm": "sm:text-display-md sm:font-display",
      "md": "md:text-display-md md:font-display",
      "lg": "lg:text-display-md lg:font-display",
      "xl": "xl:text-display-md xl:font-display"
    },
    "display-lg": {
      "xs": "text-display-lg font-display",
      "sm": "sm:text-display-lg sm:font-display",
      "md": "md:text-display-lg md:font-display",
      "lg": "lg:text-display-lg lg:font-display",
      "xl": "xl:text-display-lg xl:font-display"
    },
    "headline-sm": {
      "xs": "text-headline-sm font-display",
      "sm": "sm:text-headline-sm sm:font-display",
      "md": "md:text-headline-sm md:font-display",
      "lg": "lg:text-headline-sm lg:font-display",
      "xl": "xl:text-headline-sm xl:font-display"
    },
    "headline-md": {
      "xs": "text-headline-md font-display",
      "sm": "sm:text-headline-md sm:font-display",
      "md": "md:text-headline-md md:font-display",
      "lg": "lg:text-headline-md lg:font-display",
      "xl": "xl:text-headline-md xl:font-display"
    },
    "headline-lg": {
      "xs": "text-headline-lg font-display",
      "sm": "sm:text-headline-lg sm:font-display",
      "md": "md:text-headline-lg md:font-display",
      "lg": "lg:text-headline-lg lg:font-display",
      "xl": "xl:text-headline-lg xl:font-display"
    },
    "title-sm": {
      "xs": "text-title-sm font-display",
      "sm": "sm:text-title-sm sm:font-display",
      "md": "md:text-title-sm md:font-display",
      "lg": "lg:text-title-sm lg:font-display",
      "xl": "xl:text-title-sm xl:font-display"
    },
    "title-md": {
      "xs": "text-title-md font-display",
      "sm": "sm:text-title-md sm:font-display",
      "md": "md:text-title-md md:font-display",
      "lg": "lg:text-title-md lg:font-display",
      "xl": "xl:text-title-md xl:font-display"
    },
    "title-lg": {
      "xs": "text-title-lg font-display",
      "sm": "sm:text-title-lg sm:font-display",
      "md": "md:text-title-lg md:font-display",
      "lg": "lg:text-title-lg lg:font-display",
      "xl": "xl:text-title-lg xl:font-display"
    },
    "body-sm": {
      "xs": "text-body-sm font-product",
      "sm": "sm:text-body-sm sm:font-product",
      "md": "md:text-body-sm md:font-product",
      "lg": "lg:text-body-sm lg:font-product",
      "xl": "xl:text-body-sm xl:font-product"
    },
    "body-md": {
      "xs": "text-body-md font-product",
      "sm": "sm:text-body-md sm:font-product",
      "md": "md:text-body-md md:font-product",
      "lg": "lg:text-body-md lg:font-product",
      "xl": "xl:text-body-md xl:font-product"
    },
    "body-lg": {
      "xs": "text-body-lg font-product",
      "sm": "sm:text-body-lg sm:font-product",
      "md": "md:text-body-lg md:font-product",
      "lg": "lg:text-body-lg lg:font-product",
      "xl": "xl:text-body-lg xl:font-product"
    },
    "label-sm": {
      "xs": "text-label-sm font-product",
      "sm": "sm:text-label-sm sm:font-product",
      "md": "md:text-label-sm md:font-product",
      "lg": "lg:text-label-sm lg:font-product",
      "xl": "xl:text-label-sm xl:font-product"
    },
    "label-md": {
      "xs": "text-label-md font-product",
      "sm": "sm:text-label-md sm:font-product",
      "md": "md:text-label-md md:font-product",
      "lg": "lg:text-label-md lg:font-product",
      "xl": "xl:text-label-md xl:font-product"
    },
    "label-lg": {
      "xs": "text-label-lg font-product",
      "sm": "sm:text-label-lg sm:font-product",
      "md": "md:text-label-lg md:font-product",
      "lg": "lg:text-label-lg lg:font-product",
      "xl": "xl:text-label-lg xl:font-product"
    }
  },
  "iconSize": {
    "2xs": {
      "xs": "vy-icon-2xs",
      "sm": "sm:vy-icon-2xs",
      "md": "md:vy-icon-2xs",
      "lg": "lg:vy-icon-2xs",
      "xl": "xl:vy-icon-2xs"
    },
    "xs": {
      "xs": "vy-icon-xs",
      "sm": "sm:vy-icon-xs",
      "md": "md:vy-icon-xs",
      "lg": "lg:vy-icon-xs",
      "xl": "xl:vy-icon-xs"
    },
    "sm": {
      "xs": "vy-icon-sm",
      "sm": "sm:vy-icon-sm",
      "md": "md:vy-icon-sm",
      "lg": "lg:vy-icon-sm",
      "xl": "xl:vy-icon-sm"
    },
    "md": {
      "xs": "vy-icon-md",
      "sm": "sm:vy-icon-md",
      "md": "md:vy-icon-md",
      "lg": "lg:vy-icon-md",
      "xl": "xl:vy-icon-md"
    },
    "lg": {
      "xs": "vy-icon-lg",
      "sm": "sm:vy-icon-lg",
      "md": "md:vy-icon-lg",
      "lg": "lg:vy-icon-lg",
      "xl": "xl:vy-icon-lg"
    },
    "xl": {
      "xs": "vy-icon-xl",
      "sm": "sm:vy-icon-xl",
      "md": "md:vy-icon-xl",
      "lg": "lg:vy-icon-xl",
      "xl": "xl:vy-icon-xl"
    },
    "2xl": {
      "xs": "vy-icon-2xl",
      "sm": "sm:vy-icon-2xl",
      "md": "md:vy-icon-2xl",
      "lg": "lg:vy-icon-2xl",
      "xl": "xl:vy-icon-2xl"
    },
    "3xl": {
      "xs": "vy-icon-3xl",
      "sm": "sm:vy-icon-3xl",
      "md": "md:vy-icon-3xl",
      "lg": "lg:vy-icon-3xl",
      "xl": "xl:vy-icon-3xl"
    }
  },
  "textColor": {
    "primary-default": "text-primary-default",
    "on-primary-default": "text-on-primary-default",
    "on-primary-container-default": "text-on-primary-container-default",
    "secondary-default": "text-secondary-default",
    "on-secondary-default": "text-on-secondary-default",
    "on-secondary-container-default": "text-on-secondary-container-default",
    "error-default": "text-error-default",
    "on-error-default": "text-on-error-default",
    "on-error-container-default": "text-on-error-container-default",
    "warning-default": "text-warning-default",
    "on-warning-default": "text-on-warning-default",
    "on-warning-container-default": "text-on-warning-container-default",
    "info-default": "text-info-default",
    "on-info-default": "text-on-info-default",
    "on-info-container-default": "text-on-info-container-default",
    "success-default": "text-success-default",
    "on-success-default": "text-on-success-default",
    "on-success-container-default": "text-on-success-container-default",
    "tertiary-default": "text-tertiary-default",
    "on-tertiary-default": "text-on-tertiary-default",
    "on-tertiary-container-default": "text-on-tertiary-container-default",
    "on-surface-default": "text-on-surface-default",
    "on-surface-disabled": "text-on-surface-disabled",
    "on-surface-variant-default": "text-on-surface-variant-default"
  }
} as const;
export type CssVariables = {
  readonly space: Readonly<Record<SpaceStep, string>>;
  readonly motionDuration: Readonly<Record<MotionStep, string>>;
  readonly dwell: Readonly<Record<DwellStep, string>>;
};
export const cssVariables = {
  "space": {
    "none": "--vy-space-none",
    "2xs": "--vy-space-2xs",
    "xs": "--vy-space-xs",
    "sm": "--vy-space-sm",
    "md": "--vy-space-md",
    "lg": "--vy-space-lg",
    "xl": "--vy-space-xl",
    "2xl": "--vy-space-2xl",
    "3xl": "--vy-space-3xl"
  },
  "motionDuration": {
    "none": "--vy-motion-duration-none",
    "2xs": "--vy-motion-duration-2xs",
    "xs": "--vy-motion-duration-xs",
    "sm": "--vy-motion-duration-sm",
    "md": "--vy-motion-duration-md",
    "lg": "--vy-motion-duration-lg",
    "xl": "--vy-motion-duration-xl",
    "2xl": "--vy-motion-duration-2xl",
    "3xl": "--vy-motion-duration-3xl"
  },
  "dwell": {
    "short": "--vy-dwell-short",
    "medium": "--vy-dwell-medium",
    "long": "--vy-dwell-long"
  }
} as const satisfies CssVariables;
export const button = {
  "slots": {
    "root": "vy-button-root",
    "addonStart": "vy-button-addon-start",
    "addonEnd": "vy-button-addon-end",
    "addonInsetStart": "vy-button-addon-inset-start",
    "addonInsetEnd": "vy-button-addon-inset-end"
  },
  "variants": {
    "contained": {
      "primary": "vy-button-contained-primary",
      "secondary": "vy-button-contained-secondary",
      "error": "vy-button-contained-error",
      "warning": "vy-button-contained-warning",
      "info": "vy-button-contained-info",
      "success": "vy-button-contained-success"
    },
    "outlined": {
      "primary": "vy-button-outlined-primary",
      "secondary": "vy-button-outlined-secondary",
      "error": "vy-button-outlined-error",
      "warning": "vy-button-outlined-warning",
      "info": "vy-button-outlined-info",
      "success": "vy-button-outlined-success"
    },
    "text": {
      "primary": "vy-button-text-primary",
      "secondary": "vy-button-text-secondary",
      "error": "vy-button-text-error",
      "warning": "vy-button-text-warning",
      "info": "vy-button-text-info",
      "success": "vy-button-text-success"
    }
  },
  "sizes": {
    "xs": {
      "xs": "vy-button-xs",
      "sm": "sm:vy-button-xs",
      "md": "md:vy-button-xs",
      "lg": "lg:vy-button-xs",
      "xl": "xl:vy-button-xs"
    },
    "sm": {
      "xs": "vy-button-sm",
      "sm": "sm:vy-button-sm",
      "md": "md:vy-button-sm",
      "lg": "lg:vy-button-sm",
      "xl": "xl:vy-button-sm"
    },
    "md": {
      "xs": "vy-button-md",
      "sm": "sm:vy-button-md",
      "md": "md:vy-button-md",
      "lg": "lg:vy-button-md",
      "xl": "xl:vy-button-md"
    },
    "lg": {
      "xs": "vy-button-lg",
      "sm": "sm:vy-button-lg",
      "md": "md:vy-button-lg",
      "lg": "lg:vy-button-lg",
      "xl": "xl:vy-button-lg"
    }
  },
  "childProps": {
    "xs": {
      "icon": {
        "size": "xs"
      },
      "progress": {
        "size": "sm"
      },
      "addon": {
        "size": "2xs"
      }
    },
    "sm": {
      "icon": {
        "size": "sm"
      },
      "progress": {
        "size": "sm"
      },
      "addon": {
        "size": "xs"
      }
    },
    "md": {
      "icon": {
        "size": "sm"
      },
      "progress": {
        "size": "sm"
      },
      "addon": {
        "size": "sm"
      }
    },
    "lg": {
      "icon": {
        "size": "sm"
      },
      "progress": {
        "size": "sm"
      },
      "addon": {
        "size": "md"
      }
    }
  }
} as const satisfies ComponentMap;
export const textField = {
  "slots": {
    "input": "vy-text-field-input",
    "htmlInput": "vy-text-field-html-input",
    "label": "vy-text-field-label",
    "helperText": "vy-text-field-helper-text",
    "adornment": "vy-text-field-adornment",
    "fileSelectorButton": "vy-text-field-file-selector-button",
    "root": "vy-text-field-root",
    "addonStart": "vy-text-field-addon-start",
    "addonEnd": "vy-text-field-addon-end",
    "multiline": "vy-text-field-multiline",
    "addonInsetStart": "vy-text-field-addon-inset-start",
    "addonInsetEnd": "vy-text-field-addon-inset-end"
  },
  "variants": {
    "outlined": {
      "primary": "vy-text-field-outlined-primary"
    },
    "filled": {
      "primary": "vy-text-field-filled-primary"
    }
  },
  "sizes": {
    "xs": {
      "xs": "vy-text-field-xs",
      "sm": "sm:vy-text-field-xs",
      "md": "md:vy-text-field-xs",
      "lg": "lg:vy-text-field-xs",
      "xl": "xl:vy-text-field-xs"
    },
    "sm": {
      "xs": "vy-text-field-sm",
      "sm": "sm:vy-text-field-sm",
      "md": "md:vy-text-field-sm",
      "lg": "lg:vy-text-field-sm",
      "xl": "xl:vy-text-field-sm"
    },
    "md": {
      "xs": "vy-text-field-md",
      "sm": "sm:vy-text-field-md",
      "md": "md:vy-text-field-md",
      "lg": "lg:vy-text-field-md",
      "xl": "xl:vy-text-field-md"
    },
    "lg": {
      "xs": "vy-text-field-lg",
      "sm": "sm:vy-text-field-lg",
      "md": "md:vy-text-field-lg",
      "lg": "lg:vy-text-field-lg",
      "xl": "xl:vy-text-field-lg"
    }
  },
  "childProps": {
    "xs": {
      "adornment": {
        "size": "xs"
      },
      "addon": {
        "size": "2xs"
      }
    },
    "sm": {
      "adornment": {
        "size": "sm"
      },
      "addon": {
        "size": "xs"
      }
    },
    "md": {
      "adornment": {
        "size": "sm"
      },
      "addon": {
        "size": "sm"
      }
    },
    "lg": {
      "adornment": {
        "size": "sm"
      },
      "addon": {
        "size": "md"
      }
    }
  }
} as const satisfies ComponentMap;
export const circularProgress = {
  "slots": {
    "indicator": "vy-circular-progress-indicator",
    "root": "vy-circular-progress-root"
  },
  "variants": {
    "indeterminate": {
      "primary": "vy-circular-progress-indeterminate-primary",
      "secondary": "vy-circular-progress-indeterminate-secondary",
      "error": "vy-circular-progress-indeterminate-error",
      "warning": "vy-circular-progress-indeterminate-warning",
      "info": "vy-circular-progress-indeterminate-info",
      "success": "vy-circular-progress-indeterminate-success"
    },
    "determinate": {
      "primary": "vy-circular-progress-determinate-primary",
      "secondary": "vy-circular-progress-determinate-secondary",
      "error": "vy-circular-progress-determinate-error",
      "warning": "vy-circular-progress-determinate-warning",
      "info": "vy-circular-progress-determinate-info",
      "success": "vy-circular-progress-determinate-success"
    }
  },
  "sizes": {
    "sm": {
      "xs": "vy-circular-progress-sm",
      "sm": "sm:vy-circular-progress-sm",
      "md": "md:vy-circular-progress-sm",
      "lg": "lg:vy-circular-progress-sm",
      "xl": "xl:vy-circular-progress-sm"
    },
    "md": {
      "xs": "vy-circular-progress-md",
      "sm": "sm:vy-circular-progress-md",
      "md": "md:vy-circular-progress-md",
      "lg": "lg:vy-circular-progress-md",
      "xl": "xl:vy-circular-progress-md"
    },
    "lg": {
      "xs": "vy-circular-progress-lg",
      "sm": "sm:vy-circular-progress-lg",
      "md": "md:vy-circular-progress-lg",
      "lg": "lg:vy-circular-progress-lg",
      "xl": "xl:vy-circular-progress-lg"
    },
    "xl": {
      "xs": "vy-circular-progress-xl",
      "sm": "sm:vy-circular-progress-xl",
      "md": "md:vy-circular-progress-xl",
      "lg": "lg:vy-circular-progress-xl",
      "xl": "xl:vy-circular-progress-xl"
    }
  },
  "childProps": {}
} as const satisfies ComponentMap;
export const linearProgress = {
  "slots": {
    "root": "vy-linear-progress-root",
    "indicator": "vy-linear-progress-indicator"
  },
  "variants": {
    "indeterminate": {
      "primary": "vy-linear-progress-indeterminate-primary",
      "secondary": "vy-linear-progress-indeterminate-secondary",
      "error": "vy-linear-progress-indeterminate-error",
      "warning": "vy-linear-progress-indeterminate-warning",
      "info": "vy-linear-progress-indeterminate-info",
      "success": "vy-linear-progress-indeterminate-success"
    },
    "determinate": {
      "primary": "vy-linear-progress-determinate-primary",
      "secondary": "vy-linear-progress-determinate-secondary",
      "error": "vy-linear-progress-determinate-error",
      "warning": "vy-linear-progress-determinate-warning",
      "info": "vy-linear-progress-determinate-info",
      "success": "vy-linear-progress-determinate-success"
    }
  },
  "sizes": {
    "sm": {
      "xs": "vy-linear-progress-sm",
      "sm": "sm:vy-linear-progress-sm",
      "md": "md:vy-linear-progress-sm",
      "lg": "lg:vy-linear-progress-sm",
      "xl": "xl:vy-linear-progress-sm"
    },
    "md": {
      "xs": "vy-linear-progress-md",
      "sm": "sm:vy-linear-progress-md",
      "md": "md:vy-linear-progress-md",
      "lg": "lg:vy-linear-progress-md",
      "xl": "xl:vy-linear-progress-md"
    },
    "lg": {
      "xs": "vy-linear-progress-lg",
      "sm": "sm:vy-linear-progress-lg",
      "md": "md:vy-linear-progress-lg",
      "lg": "lg:vy-linear-progress-lg",
      "xl": "xl:vy-linear-progress-lg"
    },
    "xl": {
      "xs": "vy-linear-progress-xl",
      "sm": "sm:vy-linear-progress-xl",
      "md": "md:vy-linear-progress-xl",
      "lg": "lg:vy-linear-progress-xl",
      "xl": "xl:vy-linear-progress-xl"
    }
  },
  "childProps": {}
} as const satisfies ComponentMap;
export const divider = {
  "slots": {
    "root": "vy-divider-root",
    "line": "vy-divider-line",
    "label": "vy-divider-label"
  },
  "variants": {
    "fullWidth": {
      "primary": "vy-divider-fullWidth-primary"
    },
    "inset": {
      "primary": "vy-divider-inset-primary"
    },
    "middle": {
      "primary": "vy-divider-middle-primary"
    }
  },
  "sizes": {},
  "childProps": {}
} as const satisfies ComponentMap;
export const tooltip = {
  "slots": {
    "root": "vy-tooltip-root"
  },
  "variants": {
    "standard": {
      "primary": "vy-tooltip-standard-primary"
    }
  },
  "sizes": {},
  "childProps": {}
} as const satisfies ComponentMap;
export const backdrop = {
  "slots": {
    "root": "vy-backdrop-root"
  },
  "variants": {
    "standard": {
      "primary": "vy-backdrop-standard-primary"
    }
  },
  "sizes": {},
  "childProps": {}
} as const satisfies ComponentMap;
export const dialog = {
  "slots": {
    "root": "vy-dialog-root",
    "title": "vy-dialog-title",
    "content": "vy-dialog-content",
    "actions": "vy-dialog-actions"
  },
  "variants": {
    "standard": {
      "primary": "vy-dialog-standard-primary"
    }
  },
  "sizes": {},
  "childProps": {}
} as const satisfies ComponentMap;
export const drawer = {
  "slots": {
    "paper": "vy-drawer-paper"
  },
  "variants": {
    "standard": {
      "primary": "vy-drawer-standard-primary"
    }
  },
  "sizes": {},
  "childProps": {}
} as const satisfies ComponentMap;
export const paper = {
  "slots": {
    "root": "vy-paper-root",
    "selection": "vy-paper-selection"
  },
  "variants": {
    "elevation": {
      "primary": "vy-paper-elevation-primary"
    },
    "outlined": {
      "primary": "vy-paper-outlined-primary"
    }
  },
  "sizes": {
    "none": null,
    "2xs": null,
    "xs": null,
    "sm": null,
    "md": null,
    "lg": null,
    "xl": null,
    "2xl": null,
    "3xl": null
  },
  "styleSizes": {
    "elevation": {
      "none": {
        "xs": "vy-paper-elevation-none",
        "sm": "sm:vy-paper-elevation-none",
        "md": "md:vy-paper-elevation-none",
        "lg": "lg:vy-paper-elevation-none",
        "xl": "xl:vy-paper-elevation-none"
      },
      "2xs": {
        "xs": "vy-paper-elevation-2xs",
        "sm": "sm:vy-paper-elevation-2xs",
        "md": "md:vy-paper-elevation-2xs",
        "lg": "lg:vy-paper-elevation-2xs",
        "xl": "xl:vy-paper-elevation-2xs"
      },
      "xs": {
        "xs": "vy-paper-elevation-xs",
        "sm": "sm:vy-paper-elevation-xs",
        "md": "md:vy-paper-elevation-xs",
        "lg": "lg:vy-paper-elevation-xs",
        "xl": "xl:vy-paper-elevation-xs"
      },
      "sm": {
        "xs": "vy-paper-elevation-sm",
        "sm": "sm:vy-paper-elevation-sm",
        "md": "md:vy-paper-elevation-sm",
        "lg": "lg:vy-paper-elevation-sm",
        "xl": "xl:vy-paper-elevation-sm"
      },
      "md": {
        "xs": "vy-paper-elevation-md",
        "sm": "sm:vy-paper-elevation-md",
        "md": "md:vy-paper-elevation-md",
        "lg": "lg:vy-paper-elevation-md",
        "xl": "xl:vy-paper-elevation-md"
      },
      "lg": {
        "xs": "vy-paper-elevation-lg",
        "sm": "sm:vy-paper-elevation-lg",
        "md": "md:vy-paper-elevation-lg",
        "lg": "lg:vy-paper-elevation-lg",
        "xl": "xl:vy-paper-elevation-lg"
      },
      "xl": {
        "xs": "vy-paper-elevation-xl",
        "sm": "sm:vy-paper-elevation-xl",
        "md": "md:vy-paper-elevation-xl",
        "lg": "lg:vy-paper-elevation-xl",
        "xl": "xl:vy-paper-elevation-xl"
      },
      "2xl": {
        "xs": "vy-paper-elevation-2xl",
        "sm": "sm:vy-paper-elevation-2xl",
        "md": "md:vy-paper-elevation-2xl",
        "lg": "lg:vy-paper-elevation-2xl",
        "xl": "xl:vy-paper-elevation-2xl"
      },
      "3xl": {
        "xs": "vy-paper-elevation-3xl",
        "sm": "sm:vy-paper-elevation-3xl",
        "md": "md:vy-paper-elevation-3xl",
        "lg": "lg:vy-paper-elevation-3xl",
        "xl": "xl:vy-paper-elevation-3xl"
      }
    },
    "outlined": {
      "none": {
        "xs": "vy-paper-outlined-none",
        "sm": "sm:vy-paper-outlined-none",
        "md": "md:vy-paper-outlined-none",
        "lg": "lg:vy-paper-outlined-none",
        "xl": "xl:vy-paper-outlined-none"
      },
      "2xs": {
        "xs": "vy-paper-outlined-2xs",
        "sm": "sm:vy-paper-outlined-2xs",
        "md": "md:vy-paper-outlined-2xs",
        "lg": "lg:vy-paper-outlined-2xs",
        "xl": "xl:vy-paper-outlined-2xs"
      },
      "xs": {
        "xs": "vy-paper-outlined-xs",
        "sm": "sm:vy-paper-outlined-xs",
        "md": "md:vy-paper-outlined-xs",
        "lg": "lg:vy-paper-outlined-xs",
        "xl": "xl:vy-paper-outlined-xs"
      },
      "sm": {
        "xs": "vy-paper-outlined-sm",
        "sm": "sm:vy-paper-outlined-sm",
        "md": "md:vy-paper-outlined-sm",
        "lg": "lg:vy-paper-outlined-sm",
        "xl": "xl:vy-paper-outlined-sm"
      },
      "md": {
        "xs": "vy-paper-outlined-md",
        "sm": "sm:vy-paper-outlined-md",
        "md": "md:vy-paper-outlined-md",
        "lg": "lg:vy-paper-outlined-md",
        "xl": "xl:vy-paper-outlined-md"
      },
      "lg": {
        "xs": "vy-paper-outlined-lg",
        "sm": "sm:vy-paper-outlined-lg",
        "md": "md:vy-paper-outlined-lg",
        "lg": "lg:vy-paper-outlined-lg",
        "xl": "xl:vy-paper-outlined-lg"
      },
      "xl": {
        "xs": "vy-paper-outlined-xl",
        "sm": "sm:vy-paper-outlined-xl",
        "md": "md:vy-paper-outlined-xl",
        "lg": "lg:vy-paper-outlined-xl",
        "xl": "xl:vy-paper-outlined-xl"
      },
      "2xl": {
        "xs": "vy-paper-outlined-2xl",
        "sm": "sm:vy-paper-outlined-2xl",
        "md": "md:vy-paper-outlined-2xl",
        "lg": "lg:vy-paper-outlined-2xl",
        "xl": "xl:vy-paper-outlined-2xl"
      },
      "3xl": {
        "xs": "vy-paper-outlined-3xl",
        "sm": "sm:vy-paper-outlined-3xl",
        "md": "md:vy-paper-outlined-3xl",
        "lg": "lg:vy-paper-outlined-3xl",
        "xl": "xl:vy-paper-outlined-3xl"
      }
    }
  },
  "childProps": {}
} as const satisfies ComponentMap;
export const collapse = {
  "slots": {
    "content": "vy-collapse-content"
  },
  "variants": {
    "vertical": {
      "primary": null
    },
    "horizontal": {
      "primary": null
    }
  },
  "sizes": {
    "none": null,
    "2xs": null,
    "xs": null,
    "sm": null,
    "md": null,
    "lg": null,
    "xl": null,
    "2xl": null,
    "3xl": null
  },
  "styleSizes": {
    "vertical": {
      "none": {
        "xs": "vy-collapse-vertical-none",
        "sm": "sm:vy-collapse-vertical-none",
        "md": "md:vy-collapse-vertical-none",
        "lg": "lg:vy-collapse-vertical-none",
        "xl": "xl:vy-collapse-vertical-none"
      },
      "2xs": {
        "xs": "vy-collapse-vertical-2xs",
        "sm": "sm:vy-collapse-vertical-2xs",
        "md": "md:vy-collapse-vertical-2xs",
        "lg": "lg:vy-collapse-vertical-2xs",
        "xl": "xl:vy-collapse-vertical-2xs"
      },
      "xs": {
        "xs": "vy-collapse-vertical-xs",
        "sm": "sm:vy-collapse-vertical-xs",
        "md": "md:vy-collapse-vertical-xs",
        "lg": "lg:vy-collapse-vertical-xs",
        "xl": "xl:vy-collapse-vertical-xs"
      },
      "sm": {
        "xs": "vy-collapse-vertical-sm",
        "sm": "sm:vy-collapse-vertical-sm",
        "md": "md:vy-collapse-vertical-sm",
        "lg": "lg:vy-collapse-vertical-sm",
        "xl": "xl:vy-collapse-vertical-sm"
      },
      "md": {
        "xs": "vy-collapse-vertical-md",
        "sm": "sm:vy-collapse-vertical-md",
        "md": "md:vy-collapse-vertical-md",
        "lg": "lg:vy-collapse-vertical-md",
        "xl": "xl:vy-collapse-vertical-md"
      },
      "lg": {
        "xs": "vy-collapse-vertical-lg",
        "sm": "sm:vy-collapse-vertical-lg",
        "md": "md:vy-collapse-vertical-lg",
        "lg": "lg:vy-collapse-vertical-lg",
        "xl": "xl:vy-collapse-vertical-lg"
      },
      "xl": {
        "xs": "vy-collapse-vertical-xl",
        "sm": "sm:vy-collapse-vertical-xl",
        "md": "md:vy-collapse-vertical-xl",
        "lg": "lg:vy-collapse-vertical-xl",
        "xl": "xl:vy-collapse-vertical-xl"
      },
      "2xl": {
        "xs": "vy-collapse-vertical-2xl",
        "sm": "sm:vy-collapse-vertical-2xl",
        "md": "md:vy-collapse-vertical-2xl",
        "lg": "lg:vy-collapse-vertical-2xl",
        "xl": "xl:vy-collapse-vertical-2xl"
      },
      "3xl": {
        "xs": "vy-collapse-vertical-3xl",
        "sm": "sm:vy-collapse-vertical-3xl",
        "md": "md:vy-collapse-vertical-3xl",
        "lg": "lg:vy-collapse-vertical-3xl",
        "xl": "xl:vy-collapse-vertical-3xl"
      }
    },
    "horizontal": {
      "none": {
        "xs": "vy-collapse-horizontal-none",
        "sm": "sm:vy-collapse-horizontal-none",
        "md": "md:vy-collapse-horizontal-none",
        "lg": "lg:vy-collapse-horizontal-none",
        "xl": "xl:vy-collapse-horizontal-none"
      },
      "2xs": {
        "xs": "vy-collapse-horizontal-2xs",
        "sm": "sm:vy-collapse-horizontal-2xs",
        "md": "md:vy-collapse-horizontal-2xs",
        "lg": "lg:vy-collapse-horizontal-2xs",
        "xl": "xl:vy-collapse-horizontal-2xs"
      },
      "xs": {
        "xs": "vy-collapse-horizontal-xs",
        "sm": "sm:vy-collapse-horizontal-xs",
        "md": "md:vy-collapse-horizontal-xs",
        "lg": "lg:vy-collapse-horizontal-xs",
        "xl": "xl:vy-collapse-horizontal-xs"
      },
      "sm": {
        "xs": "vy-collapse-horizontal-sm",
        "sm": "sm:vy-collapse-horizontal-sm",
        "md": "md:vy-collapse-horizontal-sm",
        "lg": "lg:vy-collapse-horizontal-sm",
        "xl": "xl:vy-collapse-horizontal-sm"
      },
      "md": {
        "xs": "vy-collapse-horizontal-md",
        "sm": "sm:vy-collapse-horizontal-md",
        "md": "md:vy-collapse-horizontal-md",
        "lg": "lg:vy-collapse-horizontal-md",
        "xl": "xl:vy-collapse-horizontal-md"
      },
      "lg": {
        "xs": "vy-collapse-horizontal-lg",
        "sm": "sm:vy-collapse-horizontal-lg",
        "md": "md:vy-collapse-horizontal-lg",
        "lg": "lg:vy-collapse-horizontal-lg",
        "xl": "xl:vy-collapse-horizontal-lg"
      },
      "xl": {
        "xs": "vy-collapse-horizontal-xl",
        "sm": "sm:vy-collapse-horizontal-xl",
        "md": "md:vy-collapse-horizontal-xl",
        "lg": "lg:vy-collapse-horizontal-xl",
        "xl": "xl:vy-collapse-horizontal-xl"
      },
      "2xl": {
        "xs": "vy-collapse-horizontal-2xl",
        "sm": "sm:vy-collapse-horizontal-2xl",
        "md": "md:vy-collapse-horizontal-2xl",
        "lg": "lg:vy-collapse-horizontal-2xl",
        "xl": "xl:vy-collapse-horizontal-2xl"
      },
      "3xl": {
        "xs": "vy-collapse-horizontal-3xl",
        "sm": "sm:vy-collapse-horizontal-3xl",
        "md": "md:vy-collapse-horizontal-3xl",
        "lg": "lg:vy-collapse-horizontal-3xl",
        "xl": "xl:vy-collapse-horizontal-3xl"
      }
    }
  },
  "childProps": {}
} as const satisfies ComponentMap;
export const sidebar = {
  "slots": {
    "root": "vy-sidebar-root",
    "panel": "vy-sidebar-panel",
    "header": "vy-sidebar-header",
    "content": "vy-sidebar-content",
    "footer": "vy-sidebar-footer"
  },
  "variants": {
    "standard": {
      "primary": "vy-sidebar-standard-primary",
      "secondary": "vy-sidebar-standard-secondary",
      "neutral": "vy-sidebar-standard-neutral"
    }
  },
  "sizes": {
    "md": {
      "xs": "vy-sidebar-md",
      "sm": "sm:vy-sidebar-md",
      "md": "md:vy-sidebar-md",
      "lg": "lg:vy-sidebar-md",
      "xl": "xl:vy-sidebar-md"
    }
  },
  "childProps": {}
} as const satisfies ComponentMap;
export const breadcrumbs = {
  "slots": {
    "root": "vy-breadcrumbs-root",
    "separator": "vy-breadcrumbs-separator",
    "collapse": "vy-breadcrumbs-collapse"
  },
  "variants": {
    "standard": {
      "primary": "vy-breadcrumbs-standard-primary"
    }
  },
  "sizes": {},
  "childProps": {}
} as const satisfies ComponentMap;
export const skeleton = {
  "slots": {
    "root": "vy-skeleton-root"
  },
  "variants": {
    "text": {
      "primary": "vy-skeleton-text-primary"
    },
    "rectangular": {
      "primary": "vy-skeleton-rectangular-primary"
    },
    "rounded": {
      "primary": "vy-skeleton-rounded-primary"
    },
    "circular": {
      "primary": "vy-skeleton-circular-primary"
    }
  },
  "sizes": {
    "sm": {
      "xs": "vy-skeleton-sm",
      "sm": "sm:vy-skeleton-sm",
      "md": "md:vy-skeleton-sm",
      "lg": "lg:vy-skeleton-sm",
      "xl": "xl:vy-skeleton-sm"
    },
    "md": {
      "xs": "vy-skeleton-md",
      "sm": "sm:vy-skeleton-md",
      "md": "md:vy-skeleton-md",
      "lg": "lg:vy-skeleton-md",
      "xl": "xl:vy-skeleton-md"
    },
    "lg": {
      "xs": "vy-skeleton-lg",
      "sm": "sm:vy-skeleton-lg",
      "md": "md:vy-skeleton-lg",
      "lg": "lg:vy-skeleton-lg",
      "xl": "xl:vy-skeleton-lg"
    }
  },
  "styleSizes": {
    "text": {
      "sm": {
        "xs": "vy-skeleton-text-sm",
        "sm": "sm:vy-skeleton-text-sm",
        "md": "md:vy-skeleton-text-sm",
        "lg": "lg:vy-skeleton-text-sm",
        "xl": "xl:vy-skeleton-text-sm"
      },
      "md": {
        "xs": "vy-skeleton-text-md",
        "sm": "sm:vy-skeleton-text-md",
        "md": "md:vy-skeleton-text-md",
        "lg": "lg:vy-skeleton-text-md",
        "xl": "xl:vy-skeleton-text-md"
      },
      "lg": {
        "xs": "vy-skeleton-text-lg",
        "sm": "sm:vy-skeleton-text-lg",
        "md": "md:vy-skeleton-text-lg",
        "lg": "lg:vy-skeleton-text-lg",
        "xl": "xl:vy-skeleton-text-lg"
      }
    },
    "rectangular": {
      "sm": {
        "xs": "vy-skeleton-rectangular-sm",
        "sm": "sm:vy-skeleton-rectangular-sm",
        "md": "md:vy-skeleton-rectangular-sm",
        "lg": "lg:vy-skeleton-rectangular-sm",
        "xl": "xl:vy-skeleton-rectangular-sm"
      },
      "md": {
        "xs": "vy-skeleton-rectangular-md",
        "sm": "sm:vy-skeleton-rectangular-md",
        "md": "md:vy-skeleton-rectangular-md",
        "lg": "lg:vy-skeleton-rectangular-md",
        "xl": "xl:vy-skeleton-rectangular-md"
      },
      "lg": {
        "xs": "vy-skeleton-rectangular-lg",
        "sm": "sm:vy-skeleton-rectangular-lg",
        "md": "md:vy-skeleton-rectangular-lg",
        "lg": "lg:vy-skeleton-rectangular-lg",
        "xl": "xl:vy-skeleton-rectangular-lg"
      }
    },
    "rounded": {
      "sm": {
        "xs": "vy-skeleton-rounded-sm",
        "sm": "sm:vy-skeleton-rounded-sm",
        "md": "md:vy-skeleton-rounded-sm",
        "lg": "lg:vy-skeleton-rounded-sm",
        "xl": "xl:vy-skeleton-rounded-sm"
      },
      "md": {
        "xs": "vy-skeleton-rounded-md",
        "sm": "sm:vy-skeleton-rounded-md",
        "md": "md:vy-skeleton-rounded-md",
        "lg": "lg:vy-skeleton-rounded-md",
        "xl": "xl:vy-skeleton-rounded-md"
      },
      "lg": {
        "xs": "vy-skeleton-rounded-lg",
        "sm": "sm:vy-skeleton-rounded-lg",
        "md": "md:vy-skeleton-rounded-lg",
        "lg": "lg:vy-skeleton-rounded-lg",
        "xl": "xl:vy-skeleton-rounded-lg"
      }
    },
    "circular": {
      "sm": {
        "xs": "vy-skeleton-circular-sm",
        "sm": "sm:vy-skeleton-circular-sm",
        "md": "md:vy-skeleton-circular-sm",
        "lg": "lg:vy-skeleton-circular-sm",
        "xl": "xl:vy-skeleton-circular-sm"
      },
      "md": {
        "xs": "vy-skeleton-circular-md",
        "sm": "sm:vy-skeleton-circular-md",
        "md": "md:vy-skeleton-circular-md",
        "lg": "lg:vy-skeleton-circular-md",
        "xl": "xl:vy-skeleton-circular-md"
      },
      "lg": {
        "xs": "vy-skeleton-circular-lg",
        "sm": "sm:vy-skeleton-circular-lg",
        "md": "md:vy-skeleton-circular-lg",
        "lg": "lg:vy-skeleton-circular-lg",
        "xl": "xl:vy-skeleton-circular-lg"
      }
    }
  },
  "childProps": {}
} as const satisfies ComponentMap;
export const card = {
  "slots": {
    "header": "vy-card-header",
    "title": "vy-card-title",
    "subheader": "vy-card-subheader",
    "content": "vy-card-content",
    "actions": "vy-card-actions"
  },
  "variants": {
    "standard": {
      "primary": "vy-card-standard-primary"
    }
  },
  "sizes": {},
  "childProps": {}
} as const satisfies ComponentMap;
export const avatar = {
  "slots": {
    "root": "vy-avatar-root"
  },
  "variants": {
    "circular": {
      "primary": "vy-avatar-circular-primary",
      "secondary": "vy-avatar-circular-secondary",
      "error": "vy-avatar-circular-error",
      "warning": "vy-avatar-circular-warning",
      "info": "vy-avatar-circular-info",
      "success": "vy-avatar-circular-success",
      "neutral": "vy-avatar-circular-neutral"
    },
    "rounded": {
      "primary": "vy-avatar-rounded-primary",
      "secondary": "vy-avatar-rounded-secondary",
      "error": "vy-avatar-rounded-error",
      "warning": "vy-avatar-rounded-warning",
      "info": "vy-avatar-rounded-info",
      "success": "vy-avatar-rounded-success",
      "neutral": "vy-avatar-rounded-neutral"
    },
    "square": {
      "primary": "vy-avatar-square-primary",
      "secondary": "vy-avatar-square-secondary",
      "error": "vy-avatar-square-error",
      "warning": "vy-avatar-square-warning",
      "info": "vy-avatar-square-info",
      "success": "vy-avatar-square-success",
      "neutral": "vy-avatar-square-neutral"
    }
  },
  "sizes": {
    "2xs": {
      "xs": "vy-avatar-2xs",
      "sm": "sm:vy-avatar-2xs",
      "md": "md:vy-avatar-2xs",
      "lg": "lg:vy-avatar-2xs",
      "xl": "xl:vy-avatar-2xs"
    },
    "xs": {
      "xs": "vy-avatar-xs",
      "sm": "sm:vy-avatar-xs",
      "md": "md:vy-avatar-xs",
      "lg": "lg:vy-avatar-xs",
      "xl": "xl:vy-avatar-xs"
    },
    "sm": {
      "xs": "vy-avatar-sm",
      "sm": "sm:vy-avatar-sm",
      "md": "md:vy-avatar-sm",
      "lg": "lg:vy-avatar-sm",
      "xl": "xl:vy-avatar-sm"
    },
    "md": {
      "xs": "vy-avatar-md",
      "sm": "sm:vy-avatar-md",
      "md": "md:vy-avatar-md",
      "lg": "lg:vy-avatar-md",
      "xl": "xl:vy-avatar-md"
    },
    "lg": {
      "xs": "vy-avatar-lg",
      "sm": "sm:vy-avatar-lg",
      "md": "md:vy-avatar-lg",
      "lg": "lg:vy-avatar-lg",
      "xl": "xl:vy-avatar-lg"
    },
    "xl": {
      "xs": "vy-avatar-xl",
      "sm": "sm:vy-avatar-xl",
      "md": "md:vy-avatar-xl",
      "lg": "lg:vy-avatar-xl",
      "xl": "xl:vy-avatar-xl"
    },
    "2xl": {
      "xs": "vy-avatar-2xl",
      "sm": "sm:vy-avatar-2xl",
      "md": "md:vy-avatar-2xl",
      "lg": "lg:vy-avatar-2xl",
      "xl": "xl:vy-avatar-2xl"
    }
  },
  "childProps": {
    "2xs": {
      "icon": {
        "size": "xs"
      }
    },
    "xs": {
      "icon": {
        "size": "xs"
      }
    },
    "sm": {
      "icon": {
        "size": "sm"
      }
    },
    "md": {
      "icon": {
        "size": "sm"
      }
    },
    "lg": {
      "icon": {
        "size": "sm"
      }
    },
    "xl": {
      "icon": {
        "size": "lg"
      }
    },
    "2xl": {
      "icon": {
        "size": "lg"
      }
    }
  }
} as const satisfies ComponentMap;
export const chip = {
  "slots": {
    "root": "vy-chip-root",
    "content": "vy-chip-content",
    "addonStart": "vy-chip-addon-start",
    "addonEnd": "vy-chip-addon-end",
    "addonInsetStart": "vy-chip-addon-inset-start",
    "addonInsetEnd": "vy-chip-addon-inset-end"
  },
  "variants": {
    "filled": {
      "primary": "vy-chip-filled-primary",
      "secondary": "vy-chip-filled-secondary",
      "error": "vy-chip-filled-error",
      "warning": "vy-chip-filled-warning",
      "info": "vy-chip-filled-info",
      "success": "vy-chip-filled-success",
      "neutral": "vy-chip-filled-neutral"
    },
    "outlined": {
      "primary": "vy-chip-outlined-primary",
      "secondary": "vy-chip-outlined-secondary",
      "error": "vy-chip-outlined-error",
      "warning": "vy-chip-outlined-warning",
      "info": "vy-chip-outlined-info",
      "success": "vy-chip-outlined-success",
      "neutral": "vy-chip-outlined-neutral"
    }
  },
  "sizes": {
    "xs": {
      "xs": "vy-chip-xs",
      "sm": "sm:vy-chip-xs",
      "md": "md:vy-chip-xs",
      "lg": "lg:vy-chip-xs",
      "xl": "xl:vy-chip-xs"
    },
    "sm": {
      "xs": "vy-chip-sm",
      "sm": "sm:vy-chip-sm",
      "md": "md:vy-chip-sm",
      "lg": "lg:vy-chip-sm",
      "xl": "xl:vy-chip-sm"
    },
    "md": {
      "xs": "vy-chip-md",
      "sm": "sm:vy-chip-md",
      "md": "md:vy-chip-md",
      "lg": "lg:vy-chip-md",
      "xl": "xl:vy-chip-md"
    },
    "lg": {
      "xs": "vy-chip-lg",
      "sm": "sm:vy-chip-lg",
      "md": "md:vy-chip-lg",
      "lg": "lg:vy-chip-lg",
      "xl": "xl:vy-chip-lg"
    }
  },
  "childProps": {
    "xs": {
      "icon": {
        "size": "xs"
      },
      "addon": {
        "size": "2xs"
      }
    },
    "sm": {
      "icon": {
        "size": "sm"
      },
      "addon": {
        "size": "xs"
      }
    },
    "md": {
      "icon": {
        "size": "sm"
      },
      "addon": {
        "size": "sm"
      }
    },
    "lg": {
      "icon": {
        "size": "sm"
      },
      "addon": {
        "size": "md"
      }
    }
  }
} as const satisfies ComponentMap;
export const checkbox = {
  "slots": {
    "indicator": "vy-checkbox-indicator",
    "label": "vy-checkbox-label",
    "root": "vy-checkbox-root"
  },
  "variants": {
    "standard": {
      "primary": "vy-checkbox-standard-primary",
      "secondary": "vy-checkbox-standard-secondary",
      "error": "vy-checkbox-standard-error",
      "warning": "vy-checkbox-standard-warning",
      "info": "vy-checkbox-standard-info",
      "success": "vy-checkbox-standard-success"
    }
  },
  "sizes": {
    "sm": {
      "xs": "vy-checkbox-sm",
      "sm": "sm:vy-checkbox-sm",
      "md": "md:vy-checkbox-sm",
      "lg": "lg:vy-checkbox-sm",
      "xl": "xl:vy-checkbox-sm"
    },
    "md": {
      "xs": "vy-checkbox-md",
      "sm": "sm:vy-checkbox-md",
      "md": "md:vy-checkbox-md",
      "lg": "lg:vy-checkbox-md",
      "xl": "xl:vy-checkbox-md"
    },
    "lg": {
      "xs": "vy-checkbox-lg",
      "sm": "sm:vy-checkbox-lg",
      "md": "md:vy-checkbox-lg",
      "lg": "lg:vy-checkbox-lg",
      "xl": "xl:vy-checkbox-lg"
    }
  },
  "childProps": {}
} as const satisfies ComponentMap;
export const switchTokens = {
  "slots": {
    "track": "vy-switch-track",
    "thumb": "vy-switch-thumb",
    "label": "vy-switch-label",
    "root": "vy-switch-root"
  },
  "variants": {
    "standard": {
      "primary": "vy-switch-standard-primary",
      "secondary": "vy-switch-standard-secondary",
      "error": "vy-switch-standard-error",
      "warning": "vy-switch-standard-warning",
      "info": "vy-switch-standard-info",
      "success": "vy-switch-standard-success"
    }
  },
  "sizes": {
    "sm": {
      "xs": "vy-switch-sm",
      "sm": "sm:vy-switch-sm",
      "md": "md:vy-switch-sm",
      "lg": "lg:vy-switch-sm",
      "xl": "xl:vy-switch-sm"
    },
    "md": {
      "xs": "vy-switch-md",
      "sm": "sm:vy-switch-md",
      "md": "md:vy-switch-md",
      "lg": "lg:vy-switch-md",
      "xl": "xl:vy-switch-md"
    },
    "lg": {
      "xs": "vy-switch-lg",
      "sm": "sm:vy-switch-lg",
      "md": "md:vy-switch-lg",
      "lg": "lg:vy-switch-lg",
      "xl": "xl:vy-switch-lg"
    }
  },
  "childProps": {}
} as const satisfies ComponentMap;
export const table = {
  "slots": {
    "row": "vy-table-row",
    "cell": "vy-table-cell",
    "body": "vy-table-body",
    "head": "vy-table-head",
    "sortIcon": "vy-table-sort-icon",
    "sortLabel": "vy-table-sort-label"
  },
  "variants": {
    "standard": {
      "primary": "vy-table-standard-primary"
    }
  },
  "sizes": {
    "sm": {
      "xs": "vy-table-sm",
      "sm": "sm:vy-table-sm",
      "md": "md:vy-table-sm",
      "lg": "lg:vy-table-sm",
      "xl": "xl:vy-table-sm"
    },
    "md": {
      "xs": "vy-table-md",
      "sm": "sm:vy-table-md",
      "md": "md:vy-table-md",
      "lg": "lg:vy-table-md",
      "xl": "xl:vy-table-md"
    },
    "lg": {
      "xs": "vy-table-lg",
      "sm": "sm:vy-table-lg",
      "md": "md:vy-table-lg",
      "lg": "lg:vy-table-lg",
      "xl": "xl:vy-table-lg"
    }
  },
  "childProps": {
    "sm": {
      "sortIcon": {
        "size": "sm"
      }
    },
    "md": {
      "sortIcon": {
        "size": "sm"
      }
    },
    "lg": {
      "sortIcon": {
        "size": "md"
      }
    }
  }
} as const satisfies ComponentMap;
export const popover = {
  "slots": {
    "paper": "vy-popover-paper"
  },
  "variants": {
    "standard": {
      "primary": "vy-popover-standard-primary"
    }
  },
  "sizes": {},
  "childProps": {}
} as const satisfies ComponentMap;
export const menu = {
  "slots": {
    "item": "vy-menu-item",
    "icon": "vy-menu-icon",
    "root": "vy-menu-root",
    "separator": "vy-menu-separator"
  },
  "variants": {
    "standard": {
      "primary": "vy-menu-standard-primary"
    }
  },
  "sizes": {
    "md": {
      "xs": "vy-menu-md",
      "sm": "sm:vy-menu-md",
      "md": "md:vy-menu-md",
      "lg": "lg:vy-menu-md",
      "xl": "xl:vy-menu-md"
    }
  },
  "childProps": {
    "md": {
      "item": {
        "size": "sm"
      }
    }
  }
} as const satisfies ComponentMap;
export const select = {
  "slots": {
    "indicator": "vy-select-indicator",
    "option": "vy-select-option",
    "popup": "vy-select-popup"
  },
  "variants": {
    "outlined": {
      "primary": "vy-select-outlined-primary"
    },
    "filled": {
      "primary": "vy-select-filled-primary"
    }
  },
  "sizes": {
    "xs": {
      "xs": "vy-select-xs",
      "sm": "sm:vy-select-xs",
      "md": "md:vy-select-xs",
      "lg": "lg:vy-select-xs",
      "xl": "xl:vy-select-xs"
    },
    "sm": {
      "xs": "vy-select-sm",
      "sm": "sm:vy-select-sm",
      "md": "md:vy-select-sm",
      "lg": "lg:vy-select-sm",
      "xl": "xl:vy-select-sm"
    },
    "md": {
      "xs": "vy-select-md",
      "sm": "sm:vy-select-md",
      "md": "md:vy-select-md",
      "lg": "lg:vy-select-md",
      "xl": "xl:vy-select-md"
    },
    "lg": {
      "xs": "vy-select-lg",
      "sm": "sm:vy-select-lg",
      "md": "md:vy-select-lg",
      "lg": "lg:vy-select-lg",
      "xl": "xl:vy-select-lg"
    }
  },
  "childProps": {
    "xs": {
      "indicator": {
        "size": "xs"
      }
    },
    "sm": {
      "indicator": {
        "size": "sm"
      }
    },
    "md": {
      "indicator": {
        "size": "sm"
      }
    },
    "lg": {
      "indicator": {
        "size": "sm"
      }
    }
  }
} as const satisfies ComponentMap;
export const tabs = {
  "slots": {
    "tab": "vy-tabs-tab",
    "indicator": "vy-tabs-indicator",
    "list": "vy-tabs-list",
    "panel": "vy-tabs-panel"
  },
  "variants": {
    "standard": {
      "primary": "vy-tabs-standard-primary",
      "secondary": "vy-tabs-standard-secondary",
      "neutral": "vy-tabs-standard-neutral"
    },
    "segmented": {
      "primary": "vy-tabs-segmented-primary",
      "secondary": "vy-tabs-segmented-secondary",
      "neutral": "vy-tabs-segmented-neutral"
    }
  },
  "sizes": {
    "md": {
      "xs": "vy-tabs-md",
      "sm": "sm:vy-tabs-md",
      "md": "md:vy-tabs-md",
      "lg": "lg:vy-tabs-md",
      "xl": "xl:vy-tabs-md"
    }
  },
  "styleSizes": {
    "standard": {
      "md": {
        "xs": "vy-tabs-standard-md",
        "sm": "sm:vy-tabs-standard-md",
        "md": "md:vy-tabs-standard-md",
        "lg": "lg:vy-tabs-standard-md",
        "xl": "xl:vy-tabs-standard-md"
      }
    },
    "segmented": {
      "md": {
        "xs": "vy-tabs-segmented-md",
        "sm": "sm:vy-tabs-segmented-md",
        "md": "md:vy-tabs-segmented-md",
        "lg": "lg:vy-tabs-segmented-md",
        "xl": "xl:vy-tabs-segmented-md"
      }
    }
  },
  "childProps": {
    "md": {
      "tab": {
        "size": "sm"
      }
    }
  }
} as const satisfies ComponentMap;
export const snackbar = {
  "slots": {
    "root": "vy-snackbar-root",
    "viewport": "vy-snackbar-viewport",
    "message": "vy-snackbar-message",
    "action": "vy-snackbar-action"
  },
  "variants": {
    "standard": {
      "primary": "vy-snackbar-standard-primary"
    }
  },
  "sizes": {
    "md": {
      "xs": "vy-snackbar-md",
      "sm": "sm:vy-snackbar-md",
      "md": "md:vy-snackbar-md",
      "lg": "lg:vy-snackbar-md",
      "xl": "xl:vy-snackbar-md"
    }
  },
  "childProps": {}
} as const satisfies ComponentMap;
export const dropzone = {
  "slots": {
    "root": "vy-dropzone-root",
    "label": "vy-dropzone-label",
    "helperText": "vy-dropzone-helper-text",
    "icon": "vy-dropzone-icon"
  },
  "variants": {
    "standard": {
      "primary": "vy-dropzone-standard-primary",
      "secondary": "vy-dropzone-standard-secondary",
      "error": "vy-dropzone-standard-error",
      "warning": "vy-dropzone-standard-warning",
      "info": "vy-dropzone-standard-info",
      "success": "vy-dropzone-standard-success",
      "neutral": "vy-dropzone-standard-neutral"
    }
  },
  "sizes": {
    "sm": {
      "xs": "vy-dropzone-sm",
      "sm": "sm:vy-dropzone-sm",
      "md": "md:vy-dropzone-sm",
      "lg": "lg:vy-dropzone-sm",
      "xl": "xl:vy-dropzone-sm"
    },
    "md": {
      "xs": "vy-dropzone-md",
      "sm": "sm:vy-dropzone-md",
      "md": "md:vy-dropzone-md",
      "lg": "lg:vy-dropzone-md",
      "xl": "xl:vy-dropzone-md"
    },
    "lg": {
      "xs": "vy-dropzone-lg",
      "sm": "sm:vy-dropzone-lg",
      "md": "md:vy-dropzone-lg",
      "lg": "lg:vy-dropzone-lg",
      "xl": "xl:vy-dropzone-lg"
    }
  },
  "childProps": {
    "sm": {
      "icon": {
        "size": "md"
      }
    },
    "md": {
      "icon": {
        "size": "lg"
      }
    },
    "lg": {
      "icon": {
        "size": "lg"
      }
    }
  }
} as const satisfies ComponentMap;
export const iconButton = {
  "slots": {
    "root": "vy-icon-button-root"
  },
  "variants": {
    "contained": {
      "primary": "vy-icon-button-contained-primary",
      "secondary": "vy-icon-button-contained-secondary",
      "error": "vy-icon-button-contained-error",
      "warning": "vy-icon-button-contained-warning",
      "info": "vy-icon-button-contained-info",
      "success": "vy-icon-button-contained-success",
      "neutral": "vy-icon-button-contained-neutral"
    },
    "outlined": {
      "primary": "vy-icon-button-outlined-primary",
      "secondary": "vy-icon-button-outlined-secondary",
      "error": "vy-icon-button-outlined-error",
      "warning": "vy-icon-button-outlined-warning",
      "info": "vy-icon-button-outlined-info",
      "success": "vy-icon-button-outlined-success",
      "neutral": "vy-icon-button-outlined-neutral"
    },
    "text": {
      "primary": "vy-icon-button-text-primary",
      "secondary": "vy-icon-button-text-secondary",
      "error": "vy-icon-button-text-error",
      "warning": "vy-icon-button-text-warning",
      "info": "vy-icon-button-text-info",
      "success": "vy-icon-button-text-success",
      "neutral": "vy-icon-button-text-neutral"
    }
  },
  "sizes": {
    "2xs": {
      "xs": "vy-icon-button-2xs",
      "sm": "sm:vy-icon-button-2xs",
      "md": "md:vy-icon-button-2xs",
      "lg": "lg:vy-icon-button-2xs",
      "xl": "xl:vy-icon-button-2xs"
    },
    "xs": {
      "xs": "vy-icon-button-xs",
      "sm": "sm:vy-icon-button-xs",
      "md": "md:vy-icon-button-xs",
      "lg": "lg:vy-icon-button-xs",
      "xl": "xl:vy-icon-button-xs"
    },
    "sm": {
      "xs": "vy-icon-button-sm",
      "sm": "sm:vy-icon-button-sm",
      "md": "md:vy-icon-button-sm",
      "lg": "lg:vy-icon-button-sm",
      "xl": "xl:vy-icon-button-sm"
    },
    "md": {
      "xs": "vy-icon-button-md",
      "sm": "sm:vy-icon-button-md",
      "md": "md:vy-icon-button-md",
      "lg": "lg:vy-icon-button-md",
      "xl": "xl:vy-icon-button-md"
    },
    "lg": {
      "xs": "vy-icon-button-lg",
      "sm": "sm:vy-icon-button-lg",
      "md": "md:vy-icon-button-lg",
      "lg": "lg:vy-icon-button-lg",
      "xl": "xl:vy-icon-button-lg"
    }
  },
  "childProps": {
    "2xs": {
      "icon": {
        "size": "xs"
      },
      "progress": {
        "size": "sm"
      }
    },
    "xs": {
      "icon": {
        "size": "xs"
      },
      "progress": {
        "size": "sm"
      }
    },
    "sm": {
      "icon": {
        "size": "sm"
      },
      "progress": {
        "size": "sm"
      }
    },
    "md": {
      "icon": {
        "size": "sm"
      },
      "progress": {
        "size": "sm"
      }
    },
    "lg": {
      "icon": {
        "size": "sm"
      },
      "progress": {
        "size": "sm"
      }
    }
  }
} as const satisfies ComponentMap;
export const list = {
  "slots": {
    "item": "vy-list-item",
    "icon": "vy-list-icon",
    "secondary": "vy-list-secondary",
    "row": "vy-list-row",
    "end": "vy-list-end",
    "subheader": "vy-list-subheader",
    "sticky": "vy-list-sticky",
    "divider": "vy-list-divider",
    "guide": "vy-list-guide",
    "marker": "vy-list-marker",
    "root": "vy-list-root",
    "padding": "vy-list-padding",
    "indent": "vy-list-indent",
    "nestedPadding": "vy-list-nested-padding",
    "subheaderInset": "vy-list-subheader-inset",
    "gutterStart": "vy-list-gutter-start",
    "gutterEnd": "vy-list-gutter-end",
    "reserve": "vy-list-reserve",
    "rowPadding": "vy-list-row-padding",
    "avatar": "vy-list-avatar",
    "text": "vy-list-text",
    "textInset": "vy-list-text-inset",
    "primary": "vy-list-primary",
    "markerRow": "vy-list-marker-row"
  },
  "variants": {
    "standard": {
      "neutral": "vy-list-standard-neutral",
      "primary": "vy-list-standard-primary",
      "secondary": "vy-list-standard-secondary"
    }
  },
  "sizes": {
    "xs": {
      "xs": "vy-list-xs",
      "sm": "sm:vy-list-xs",
      "md": "md:vy-list-xs",
      "lg": "lg:vy-list-xs",
      "xl": "xl:vy-list-xs"
    },
    "sm": {
      "xs": "vy-list-sm",
      "sm": "sm:vy-list-sm",
      "md": "md:vy-list-sm",
      "lg": "lg:vy-list-sm",
      "xl": "xl:vy-list-sm"
    },
    "md": {
      "xs": "vy-list-md",
      "sm": "sm:vy-list-md",
      "md": "md:vy-list-md",
      "lg": "lg:vy-list-md",
      "xl": "xl:vy-list-md"
    },
    "lg": {
      "xs": "vy-list-lg",
      "sm": "sm:vy-list-lg",
      "md": "md:vy-list-lg",
      "lg": "lg:vy-list-lg",
      "xl": "xl:vy-list-lg"
    }
  },
  "childProps": {
    "xs": {
      "icon": {
        "size": "sm"
      }
    },
    "sm": {
      "icon": {
        "size": "sm"
      }
    },
    "md": {
      "icon": {
        "size": "sm"
      }
    },
    "lg": {
      "icon": {
        "size": "md"
      }
    }
  }
} as const satisfies ComponentMap;
export const link = {
  "slots": {
    "root": "vy-link-root"
  },
  "variants": {
    "always": {
      "primary": "vy-link-always-primary",
      "secondary": "vy-link-always-secondary",
      "error": "vy-link-always-error",
      "warning": "vy-link-always-warning",
      "info": "vy-link-always-info",
      "success": "vy-link-always-success",
      "neutral": "vy-link-always-neutral"
    },
    "hover": {
      "primary": "vy-link-hover-primary",
      "secondary": "vy-link-hover-secondary",
      "error": "vy-link-hover-error",
      "warning": "vy-link-hover-warning",
      "info": "vy-link-hover-info",
      "success": "vy-link-hover-success",
      "neutral": "vy-link-hover-neutral"
    },
    "none": {
      "primary": "vy-link-none-primary",
      "secondary": "vy-link-none-secondary",
      "error": "vy-link-none-error",
      "warning": "vy-link-none-warning",
      "info": "vy-link-none-info",
      "success": "vy-link-none-success",
      "neutral": "vy-link-none-neutral"
    }
  },
  "sizes": {},
  "childProps": {}
} as const satisfies ComponentMap;
export const componentTokens = { button, textField, circularProgress, linearProgress, divider, tooltip, backdrop, dialog, drawer, paper, collapse, sidebar, breadcrumbs, skeleton, card, avatar, chip, checkbox, switch: switchTokens, table, popover, menu, select, tabs, snackbar, dropzone, iconButton, list, link } as const;
export type ComponentTokens = typeof componentTokens;
export type ComponentName = keyof ComponentTokens;
