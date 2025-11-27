'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { FormDefinition, Question } from '@/lib/constants/forms-registry';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface UniversalFormWizardProps {
  formDefinition: FormDefinition;
  applicationId: string | null;
  initialAnswers?: Record<string, any>;
  onComplete: (answers: Record<string, any>) => void;
}

export function UniversalFormWizard({
  formDefinition,
  applicationId,
  initialAnswers = {},
  onComplete,
}: UniversalFormWizardProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>(initialAnswers);
  const { toast } = useToast();

  const currentSection = formDefinition.sections[currentSectionIndex];
  const totalSections = formDefinition.sections.length;
  const isLastSection = currentSectionIndex === totalSections - 1;
  const progress = ((currentSectionIndex + 1) / totalSections) * 100;

  // Update answer for a field
  const updateAnswer = (questionId: string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Render a single question field
  const renderQuestion = (question: Question) => {
    const value = answers[question.id] || '';

    const renderField = () => {
      switch (question.type) {
        case 'text':
        case 'email':
          return (
            <Input
              type={question.type}
              value={value}
              onChange={(e) => updateAnswer(question.id, e.target.value)}
              placeholder={question.placeholder}
            />
          );

        case 'phone':
        case 'tel':
        case 'ssn':
          return (
            <Input
              type="tel"
              value={value}
              onChange={(e) => updateAnswer(question.id, e.target.value)}
              placeholder={question.placeholder}
            />
          );

        case 'date':
          return (
            <Input
              type="date"
              value={value}
              onChange={(e) => updateAnswer(question.id, e.target.value)}
            />
          );

        case 'textarea':
          return (
            <Textarea
              value={value}
              onChange={(e) => updateAnswer(question.id, e.target.value)}
              placeholder={question.placeholder}
              rows={4}
            />
          );

        case 'select':
          return (
            <Select value={value} onValueChange={(val) => updateAnswer(question.id, val)}>
              <SelectTrigger>
                <SelectValue placeholder={question.placeholder || 'Select...'} />
              </SelectTrigger>
              <SelectContent>
                {question.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );

        case 'radio':
          return (
            <RadioGroup value={value} onValueChange={(val) => updateAnswer(question.id, val)}>
              {question.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                  <Label htmlFor={`${question.id}-${option.value}`} className="font-normal cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          );

        case 'checkbox':
          return (
            <div className="flex items-center space-x-2">
              <Checkbox
                id={question.id}
                checked={value || false}
                onCheckedChange={(checked) => updateAnswer(question.id, checked)}
              />
              <Label htmlFor={question.id} className="font-normal cursor-pointer">
                {question.label}
              </Label>
            </div>
          );

        case 'file':
          return (
            <Input
              type="file"
              accept={question.accept}
              onChange={(e) => updateAnswer(question.id, e.target.files?.[0])}
            />
          );

        default:
          return (
            <Input
              value={value}
              onChange={(e) => updateAnswer(question.id, e.target.value)}
              placeholder={question.placeholder}
            />
          );
      }
    };

    // For checkbox, label is part of the field
    if (question.type === 'checkbox') {
      return (
        <div key={question.id} className="space-y-2">
          {question.helpText && (
            <p className="text-sm text-muted-foreground">{question.helpText}</p>
          )}
          {renderField()}
        </div>
      );
    }

    return (
      <div key={question.id} className="space-y-2">
        <Label className="text-base font-medium">
          {question.label}
          {question.required && <span className="text-destructive ml-1">*</span>}
        </Label>
        {question.helpText && (
          <p className="text-sm text-muted-foreground">{question.helpText}</p>
        )}
        {renderField()}
      </div>
    );
  };

  // Simple validation - just check if required fields have values
  const validateCurrentSection = () => {
    const requiredFields = currentSection.questions
      .filter((q) => q.required)
      .map((q) => q.id);

    const missingFields = requiredFields.filter((fieldId) => {
      const value = answers[fieldId];
      return !value || value === '' || value === undefined || value === null;
    });

    if (missingFields.length > 0) {
      toast({
        title: 'Missing Required Fields',
        description: 'Please fill in all required fields before continuing.',
        variant: 'destructive',
      });
      return false;
    }

    return true;
  };

  // Navigation handlers
  const handleNext = () => {
    console.log('Next clicked, current answers:', answers);

    if (!validateCurrentSection()) {
      return;
    }

    if (!isLastSection) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Complete the form
      console.log('Form complete, final answers:', answers);
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">
            Step {currentSectionIndex + 1} of {totalSections}
          </span>
          {!applicationId && (
            <span className="text-sm text-muted-foreground">Preview Mode</span>
          )}
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Section Card */}
      <Card>
        <CardHeader>
          <CardTitle>{currentSection.title}</CardTitle>
          {currentSection.description && (
            <CardDescription>{currentSection.description}</CardDescription>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {currentSection.questions.map((question) => renderQuestion(question))}
        </CardContent>

        <CardFooter className="flex justify-between border-t pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentSectionIndex === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <Button type="button" onClick={handleNext}>
            {isLastSection ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Complete
              </>
            ) : (
              <>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Section Navigation Dots */}
      <div className="mt-6 flex justify-center gap-2">
        {formDefinition.sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => setCurrentSectionIndex(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentSectionIndex
                ? 'bg-primary w-8'
                : index < currentSectionIndex
                ? 'bg-primary/50'
                : 'bg-muted'
            }`}
            aria-label={`Go to ${section.title}`}
          />
        ))}
      </div>
    </div>
  );
}
