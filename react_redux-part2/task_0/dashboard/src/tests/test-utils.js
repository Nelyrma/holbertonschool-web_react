import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../app/rootReducer'; // adapte ce chemin si besoin

export function renderWithProvider(ui, { store = configureStore({ reducer: rootReducer }), ...renderOptions } = {}) {
  return render(<Provider store={store}>{ui}</Provider>, renderOptions);
}
