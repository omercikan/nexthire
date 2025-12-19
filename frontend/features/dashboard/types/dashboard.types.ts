import { IconType } from "react-icons/lib";

export interface HeaderNavigationProps {
  navigations: {
    navigationId: number;
    href?: string;
    icon: IconType;
    iconColor: string;
    ariaLabel: string;
    className?: string;
  }[];
}

export interface DashboardLinkItem {
  linkId: number;
  href: string;
  linkText: string;
  icon: IconType;
  isRender?: boolean;
}

export interface DashboardLinkItemProps extends DashboardLinkItem {
  activeLinkFunc: () => void;
  pathname: string;
}

export interface SidebarImageProps {
  width: number;
  height: number;
  imageClassName?: string;
  linkClassName?: string;
  isSmallLogo: boolean;
}
