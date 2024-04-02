import type { ICommentFlat } from '@/models/schemas/Comment';
import {
	createContext,
	useContext,
	useState,
	type ReactNode,
	type Dispatch,
	type SetStateAction,
} from 'react';

interface PinContextType {
	isPinAttached: boolean;
	setIsPinAttached: Dispatch<SetStateAction<boolean>>;
	pinLocation: ICommentFlat['pin'] | null;
	setPinLocation: Dispatch<SetStateAction<ICommentFlat['pin'] | null>>;
	highlightedPinCommentId: string;
	setHighlightedPinCommentId: Dispatch<SetStateAction<string>>;
}

const defaultPinContextValue: PinContextType = {
	isPinAttached: false,
	setIsPinAttached: () => {},
	pinLocation: null,
	setPinLocation: () => {},
	highlightedPinCommentId: '',
	setHighlightedPinCommentId: () => {},
};

const PinContext = createContext<PinContextType>(defaultPinContextValue);

export const usePin = () => useContext(PinContext);

export const PinProvider = ({ children }: { children: ReactNode }) => {
	const [pinLocation, setPinLocation] = useState<ICommentFlat['pin'] | null>(
		null
	);
	const [isPinAttached, setIsPinAttached] = useState(false);
	const [highlightedPinCommentId, setHighlightedPinCommentId] = useState('');

	return (
		<PinContext.Provider
			value={{
				isPinAttached,
				setIsPinAttached,
				pinLocation,
				setPinLocation,
				highlightedPinCommentId,
				setHighlightedPinCommentId,
			}}
		>
			{children}
		</PinContext.Provider>
	);
};
