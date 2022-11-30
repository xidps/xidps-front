import {EAuthority} from "@/types/auth";

/**
 * home layout types
 */


export interface IUserProfileProps {
    adminId?: string
    adminName?: string
    adminAuthority?: EAuthority
}
export interface INavMenuLink {
    to: string;
    icon?: string
    title: string;
    children?: Array<INavMenuLink>;
}

