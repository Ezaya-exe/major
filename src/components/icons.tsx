import type { ReactNode, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function Base({ children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  )
}

export const HomeIcon = (p: IconProps) => (
  <Base {...p}><path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2z" /></Base>
)
export const ChatIcon = (p: IconProps) => (
  <Base {...p}><path d="M21 11.5A8.5 8.5 0 1 1 17.4 4.6" /><path d="M21 4v6h-6" /><path d="M21 11.5A8.5 8.5 0 0 1 19.7 16l1.3 5-5-1.3" /></Base>
)
export const ClipboardIcon = (p: IconProps) => (
  <Base {...p}><rect x="8" y="3" width="8" height="4" rx="1" /><path d="M16 5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2" /></Base>
)
export const ListIcon = (p: IconProps) => (
  <Base {...p}><path d="M8 6h13M8 12h13M8 18h13" /><circle cx="3.5" cy="6" r="1" /><circle cx="3.5" cy="12" r="1" /><circle cx="3.5" cy="18" r="1" /></Base>
)
export const ChevronRightIcon = (p: IconProps) => (
  <Base {...p}><path d="M9 6l6 6-6 6" /></Base>
)
export const InfoIcon = (p: IconProps) => (
  <Base {...p}><circle cx="12" cy="12" r="9" /><path d="M12 8h.01M11 12h1v5h1" /></Base>
)
export const AlertIcon = (p: IconProps) => (
  <Base {...p}><path d="M12 3.5L2.5 20h19z" /><path d="M12 10v4M12 17h.01" /></Base>
)
export const MenuIcon = (p: IconProps) => (
  <Base {...p}><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></Base>
)
