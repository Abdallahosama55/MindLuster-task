import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export const useTasks = () => {
  return useSelector((state: RootState) => state.tasks.tasks);
};