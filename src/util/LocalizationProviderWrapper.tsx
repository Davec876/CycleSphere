'use client';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import React from 'react';

export default function LocalizationProviderWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<LocalizationProvider dateAdapter={AdapterLuxon}>
			{children}
		</LocalizationProvider>
	);
}
