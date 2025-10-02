import { type ClassValue } from 'clsx';
export declare function composeEventHandlers<E>(originalEventHandler?: (event: E) => void, ourEventHandler?: (event: E) => void, { checkForDefaultPrevented }?: {
    checkForDefaultPrevented?: boolean | undefined;
}): (event: E) => void;
export declare function cn(...inputs: ClassValue[]): string;
export declare function findEventHandlers(props: Record<string, unknown>): string[];
type ContainerStyleProps = {
    className?: string;
    style?: React.CSSProperties;
};
type SeparatedStyles = {
    containerClasses: string;
    containerStyles: React.CSSProperties;
    innerClasses: string;
    innerStyles: React.CSSProperties;
};
/**
 * Extracts container-related styles (margin, display, position) from className and style props.
 * Returns separated classes and styles for container and inner elements.
 */
export declare function extractContainerStyles({ className, style }: ContainerStyleProps): SeparatedStyles;
export {};
