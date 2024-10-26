import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './index';


// Typed version of useDispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
// Typed version of useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
