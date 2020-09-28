import * as React from 'react';
import { Box, BoxProps, Text } from 'grommet';
import Button from './Button';
import {
	StatusCritical,
	StatusDisabled,
	StatusGood,
	StatusUnknown,
	StatusWarning,
	Close as CloseIcon
} from 'grommet-icons';
import styled from 'styled-components';

interface NotificationProps extends BoxProps {
	onClose?: () => void;
	onRetryClick?: () => void;
	message: string;
	status?: 'critical' | 'disabled' | 'ok' | 'unknown' | 'warning';
}

const VALUE_ICON = {
	critical: StatusCritical,
	disabled: StatusDisabled,
	ok: StatusGood,
	unknown: StatusUnknown,
	warning: StatusWarning
} as { [key: string]: any };

const StatusIcon = ({ value, color, ...rest }: { value: string; color: string }) => {
	const Icon = VALUE_ICON[value.toLowerCase()] || StatusUnknown;
	return <Icon color={`status-${value.toLowerCase()}`} {...rest} />;
};

const StyledText = styled(Text)`
	color: var(--black);
`;

export default ({ message, status, onClose, onRetryClick, ...rest }: NotificationProps): ReturnType<React.FC> => (
	<Box
		direction="row"
		pad="small"
		align="center"
		justify="between"
		background={status ? `status-${status.toLowerCase()}` : undefined}
		{...rest}
	>
		{status ? (
			<Box margin={{ right: 'medium' }}>
				<StatusIcon value={status} color="white" />
			</Box>
		) : null}
		{message ? <StyledText>{message}</StyledText> : null}
		{onRetryClick ? (
			<Box margin={{ right: 'medium' }} onClick={onRetryClick}>
				<Button primary plain={false}>
					Retry
				</Button>
			</Box>
		) : null}
		{onClose ? (
			<Box margin={{ right: 'medium' }} onClick={onClose}>
				<Button>
					<CloseIcon color="white" />
				</Button>
			</Box>
		) : null}
	</Box>
);
