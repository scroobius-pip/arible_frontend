import { IGeneratedStatus } from '@/lib/api';

// import { Search } from 'lucide-react'
export function extractImageUrl(status: IGeneratedStatus): string | null {
    if (typeof status === 'object' && 'Done' in status) {
        return status.Done;
    }
    return null;
}
