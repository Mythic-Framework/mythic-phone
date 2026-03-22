/**
 * src/hooks/typed.ts
 *
 * Drop-in typed replacements for useDispatch / useSelector.
 * Existing hook files can import from here instead of 'react-redux'
 * to get full RootState inference without touching every file.
 */
export { useAppDispatch as useDispatch, useAppSelector as useSelector } from '../store';
