import { format } from 'date-fns/fp';

export const formatDate = format('dd/MM/yyyy');

export const formatDateTime = format('dd/MM/yyyy HH:mm');

export const formatDateTimeText = format('dd MMMM yyyy HH:mm');
