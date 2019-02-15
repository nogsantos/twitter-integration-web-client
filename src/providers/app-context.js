import React from 'react';

export const AppContext = React.createContext({
	handleDrawerClose: () => {},
	handleDrawerOpen: () => {},
	open: false
});
