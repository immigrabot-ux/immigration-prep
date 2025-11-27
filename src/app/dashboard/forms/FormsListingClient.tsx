'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { FORM_REGISTRY } from '@/lib/constants/forms-registry';
import { FileText, Trash2, ArrowLeft, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

interface Application {
  id: string;
  form_id: string;
  status: string;
  package_id: string | null;
  created_at: string;
  updated_at: string;
  answeredQuestions: number;
}

interface FormsListingClientProps {
  applications: Application[];
}

export function FormsListingClient({ applications }: FormsListingClientProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // Group applications by package
  const groupedApplications = applications.reduce((acc, app) => {
    const key = app.package_id || app.id;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(app);
    return acc;
  }, {} as Record<string, Application[]>);

  const handleDelete = async (applicationId: string) => {
    setApplicationToDelete(applicationId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!applicationToDelete) return;

    setIsDeleting(true);
    try {
      // Delete the application and all associated answers
      const response = await fetch(`/api/applications/${applicationToDelete}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete application');
      }

      toast({
        title: 'Application Deleted',
        description: 'Your form application has been deleted.',
      });

      // Refresh the page
      router.refresh();
    } catch (error) {
      console.error('Error deleting application:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete application. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setApplicationToDelete(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'in_review':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'draft':
        return <FileText className="h-5 w-5 text-orange-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_review':
        return 'In Review';
      case 'draft':
        return 'Draft';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'draft':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const calculateProgress = (app: Application) => {
    const form = FORM_REGISTRY[app.form_id];
    if (!form) return 0;

    const totalQuestions = form.sections.reduce(
      (sum, section) => sum + section.questions.length,
      0
    );
    return Math.round((app.answeredQuestions / totalQuestions) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>
          <p className="text-muted-foreground mt-2">
            View and manage all your form applications
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {applications.length === 0 ? (
          <Card className="p-12 text-center">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Applications Yet</h3>
            <p className="text-muted-foreground mb-4">
              Get started by creating your first form application
            </p>
            <Button asChild>
              <Link href="/dashboard">Browse Forms</Link>
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedApplications).map(([key, apps]) => {
              const isPackage = apps.length > 1 && apps[0].package_id;

              return (
                <div key={key}>
                  {isPackage && (
                    <div className="mb-3">
                      <Badge variant="secondary" className="text-sm">
                        Package: {apps[0].package_id}
                      </Badge>
                    </div>
                  )}

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {apps.map((app) => {
                      const form = FORM_REGISTRY[app.form_id];
                      if (!form) return null;

                      const progress = calculateProgress(app);

                      return (
                        <Card key={app.id} className="hover:shadow-md transition-shadow">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <CardTitle className="text-lg">
                                    {form.id}
                                  </CardTitle>
                                  {getStatusIcon(app.status)}
                                </div>
                                <CardDescription className="line-clamp-2">
                                  {form.title}
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>

                          <CardContent className="space-y-4">
                            {/* Status Badge */}
                            <Badge
                              variant="outline"
                              className={getStatusColor(app.status)}
                            >
                              {getStatusLabel(app.status)}
                            </Badge>

                            {/* Progress Bar */}
                            {app.status === 'draft' && (
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">
                                    Progress
                                  </span>
                                  <span className="font-medium">{progress}%</span>
                                </div>
                                <Progress value={progress} />
                              </div>
                            )}

                            {/* Dates */}
                            <div className="text-sm text-muted-foreground space-y-1">
                              <div>
                                Created:{' '}
                                {new Date(app.created_at).toLocaleDateString()}
                              </div>
                              <div>
                                Updated:{' '}
                                {new Date(app.updated_at).toLocaleDateString()}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                              <Button asChild className="flex-1" size="sm">
                                <Link
                                  href={
                                    app.status === 'completed' ||
                                    app.status === 'in_review'
                                      ? `/dashboard/forms/${form.id}/review?applicationId=${app.id}`
                                      : `/dashboard/forms/${form.id}?applicationId=${app.id}`
                                  }
                                >
                                  {app.status === 'completed' ||
                                  app.status === 'in_review'
                                    ? 'Review'
                                    : 'Continue'}
                                </Link>
                              </Button>
                              {app.status === 'draft' && (
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleDelete(app.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Application</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this application? This action cannot
              be undone and all your answers will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
