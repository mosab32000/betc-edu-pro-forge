import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface ErrorAlertProps {
  error: any;
  retry?: () => void;
  className?: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  error,
  retry,
  className
}) => {
  const errorMessage = error?.message || 'حدث خطأ غير متوقع';

  return (
    <Alert variant="destructive" className={className}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>خطأ</AlertTitle>
      <AlertDescription className="mt-2">
        {errorMessage}
        {retry && (
          <Button
            variant="outline"
            size="sm"
            onClick={retry}
            className="mt-2 gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            إعادة المحاولة
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};