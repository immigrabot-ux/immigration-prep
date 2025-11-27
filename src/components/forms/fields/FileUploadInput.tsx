'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Upload, X, File } from 'lucide-react';

interface FileUploadInputProps {
  value: File | string | null;
  onChange: (value: File | string | null) => void;
  error?: string;
  accept?: string;
}

export function FileUploadInput({
  value,
  onChange,
  error,
  accept,
}: FileUploadInputProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  const handleRemove = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileName = () => {
    if (value instanceof File) {
      return value.name;
    }
    if (typeof value === 'string') {
      return value.split('/').pop() || value;
    }
    return null;
  };

  const getFileSize = () => {
    if (value instanceof File) {
      const sizeInKB = value.size / 1024;
      if (sizeInKB < 1024) {
        return `${sizeInKB.toFixed(1)} KB`;
      }
      return `${(sizeInKB / 1024).toFixed(1)} MB`;
    }
    return null;
  };

  const fileName = getFileName();
  const fileSize = getFileSize();

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
        aria-invalid={!!error}
        aria-describedby={error ? 'error-message' : undefined}
      />

      {!fileName ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-primary hover:bg-accent',
            error && 'border-destructive'
          )}
        >
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-sm font-medium mb-1">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">
            {accept || 'All file types accepted'}
          </p>
        </div>
      ) : (
        <div
          className={cn(
            'border rounded-lg p-4 flex items-center justify-between',
            error && 'border-destructive'
          )}
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
              <File className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{fileName}</p>
              {fileSize && (
                <p className="text-xs text-muted-foreground">{fileSize}</p>
              )}
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove file</span>
          </Button>
        </div>
      )}
    </div>
  );
}
