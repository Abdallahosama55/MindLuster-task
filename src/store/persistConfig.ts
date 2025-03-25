import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import tasksReducer from '@/services/taskActions';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['tasks']
};

export const persistedTasksReducer = persistReducer(persistConfig, tasksReducer);