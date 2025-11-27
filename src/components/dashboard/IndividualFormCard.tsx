'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, DollarSign } from 'lucide-react';
import { FormDefinition } from '@/lib/constants/forms-registry';

interface IndividualFormCardProps {
  form: FormDefinition;
}

export function IndividualFormCard({ form }: IndividualFormCardProps) {
  const router = useRouter();

  const handleStartForm = () => {
    // Navigate directly to the form page
    // Access control will be handled by the form page itself
    router.push(`/dashboard/forms/${form.id}`);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      family: 'bg-blue-100 text-blue-800 border-blue-200',
      citizenship: 'bg-purple-100 text-purple-800 border-purple-200',
      work_authorization: 'bg-green-100 text-green-800 border-green-200',
      employment: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      travel: 'bg-orange-100 text-orange-800 border-orange-200',
      humanitarian: 'bg-rose-100 text-rose-800 border-rose-200',
      status_change: 'bg-amber-100 text-amber-800 border-amber-200',
      other: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusColor = (status?: string) => {
    if (!status || status === 'active') {
      return 'bg-green-100 text-green-700 border-green-200';
    }
    return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  };

  const getStatusLabel = (status?: string) => {
    if (!status || status === 'active') return 'Active';
    return 'Beta';
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      family: 'Family',
      citizenship: 'Citizenship',
      work_authorization: 'Work Auth',
      employment: 'Employment',
      travel: 'Travel',
      humanitarian: 'Humanitarian',
      status_change: 'Status Change',
      other: 'Other',
    };
    return labels[category] || category;
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <CardTitle className="text-lg">{form.code}</CardTitle>
              <Badge variant="outline" className={getStatusColor(form.status)}>
                {getStatusLabel(form.status)}
              </Badge>
            </div>
            <CardDescription className="line-clamp-2 mb-2">
              {form.name}
            </CardDescription>
            <Badge variant="outline" className={getCategoryColor(form.category)}>
              {getCategoryLabel(form.category)}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="space-y-2">
          {form.price !== undefined && (
            <div className="flex items-center gap-1.5 text-lg font-bold text-primary">
              <DollarSign className="h-5 w-5" />
              <span>${form.price}</span>
            </div>
          )}
          {form.estimatedTime && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{form.estimatedTime}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-3">
        <Button
          onClick={handleStartForm}
          variant="outline"
          className="w-full"
        >
          Start Form
        </Button>
      </CardFooter>
    </Card>
  );
}
