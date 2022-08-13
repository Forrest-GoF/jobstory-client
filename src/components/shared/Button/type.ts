import { PropsWithChildren } from 'react';

export type StyledButtonProps = {
	buttonType?: 'primary' | 'normal';
	width?: string;
	height?: string;
	fontSize?: string;
};

export type Props = {
	type: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	onClick: () => void;
} & StyledButtonProps &
	PropsWithChildren;
