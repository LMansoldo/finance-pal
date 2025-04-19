import { ReactNode } from "react";

export interface TableContextProps {
    striped?: boolean;
    hoverable?: boolean;
}

export interface TableProps extends TableContextProps {
    children: ReactNode;
    className?: string;
}

export interface HeadProps {
    children: ReactNode;
    className?: string;
}

export interface BodyProps {
    children: ReactNode;
    className?: string;
}

export interface RowProps {
    children: ReactNode;
    className?: string;
    isEven?: boolean;
}

export interface HeaderCellProps {
    children: ReactNode;
    className?: string;
    align?: 'left' | 'center' | 'right';
}

export interface CellProps {
    children: ReactNode;
    className?: string;
    align?: 'left' | 'center' | 'right';
    colSpan?: number;
}