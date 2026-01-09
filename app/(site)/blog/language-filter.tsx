'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export function LanguageFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const englishOnly = searchParams.get('englishOnly') === 'true';

  const handleChange = (checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (checked) {
      params.set('englishOnly', 'true');
    } else {
      params.delete('englishOnly');
    }
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id="language-filter-checkbox"
        checked={englishOnly}
        onCheckedChange={handleChange}
      />
      <Label htmlFor="language-filter-checkbox">Only posts in English</Label>
    </div>
  );
}
