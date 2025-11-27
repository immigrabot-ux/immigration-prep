'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RefreshCw, Download, AlertTriangle, CheckCircle, Clock, FileText } from 'lucide-react';
import { FORM_VERSIONS } from '@/lib/uscis/form-versions';

interface CheckResult {
  formId: string;
  currentEdition: string;
  latestEdition: string;
  hasUpdate: boolean;
  uscisUrl: string;
}

export default function FormVersionsPage() {
  const [checking, setChecking] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [checkResults, setCheckResults] = useState<CheckResult[]>([]);
  const [lastCheckTime, setLastCheckTime] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const formEntries = Object.entries(FORM_VERSIONS);

  const handleCheckAll = async () => {
    setChecking(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/check-updates');
      const data = await response.json();

      if (data.success) {
        // Combine updated and up-to-date forms
        const allResults: CheckResult[] = [
          ...data.result.updatedForms,
          ...data.result.upToDateForms.map((formId: string) => ({
            formId,
            currentEdition: FORM_VERSIONS[formId].edition,
            latestEdition: FORM_VERSIONS[formId].edition,
            hasUpdate: false,
            uscisUrl: FORM_VERSIONS[formId].uscisUrl,
          })),
        ];

        setCheckResults(allResults);
        setLastCheckTime(new Date(data.timestamp));
      } else {
        setError(data.error || 'Failed to check for updates');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setChecking(false);
    }
  };

  const handleDownloadAll = async () => {
    setDownloading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/check-updates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ downloadPdfs: true }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Failed to download PDFs');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadUpdates = async () => {
    setDownloading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/check-updates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ autoDownloadUpdates: true }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Failed to download updated PDFs');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setDownloading(false);
    }
  };

  const updatesAvailable = checkResults.filter((r) => r.hasUpdate).length;
  const formsNeedingRemapping = formEntries.filter(([_, v]) => v.needsFieldRemapping).length;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">USCIS Form Versions</h1>
          <p className="text-muted-foreground">
            Monitor and manage USCIS form versions and PDF templates
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleCheckAll} disabled={checking}>
            <RefreshCw className={`mr-2 h-4 w-4 ${checking ? 'animate-spin' : ''}`} />
            {checking ? 'Checking...' : 'Check All Forms'}
          </Button>

          <Button onClick={handleDownloadAll} disabled={downloading} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            {downloading ? 'Downloading...' : 'Download All PDFs'}
          </Button>

          {updatesAvailable > 0 && (
            <Button onClick={handleDownloadUpdates} disabled={downloading} variant="secondary">
              <Download className="mr-2 h-4 w-4" />
              Download Updates ({updatesAvailable})
            </Button>
          )}
        </div>

        {/* Last Check Time */}
        {lastCheckTime && (
          <Alert>
            <Clock className="h-4 w-4" />
            <AlertTitle>Last Check</AlertTitle>
            <AlertDescription>
              {lastCheckTime.toLocaleString()}
            </AlertDescription>
          </Alert>
        )}

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Updates Available Alert */}
        {updatesAvailable > 0 && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Updates Available</AlertTitle>
            <AlertDescription>
              {updatesAvailable} form(s) have been updated by USCIS.
              Download the new versions and verify field mappings.
            </AlertDescription>
          </Alert>
        )}

        {/* Forms Needing Remapping Alert */}
        {formsNeedingRemapping > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Field Remapping Required</AlertTitle>
            <AlertDescription>
              {formsNeedingRemapping} form(s) need field mapping verification before deployment.
            </AlertDescription>
          </Alert>
        )}

        {/* Forms Table */}
        <Card>
          <CardHeader>
            <CardTitle>Form Status ({formEntries.length} forms)</CardTitle>
            <CardDescription>
              Current edition dates and update status for all USCIS forms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Form ID</TableHead>
                  <TableHead>Current Edition</TableHead>
                  <TableHead>Latest Edition</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Last Checked</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formEntries.map(([formId, version]) => {
                  const checkResult = checkResults.find((r) => r.formId === formId);
                  const hasUpdate = checkResult?.hasUpdate || false;
                  const latestEdition = checkResult?.latestEdition || version.edition;

                  return (
                    <TableRow key={formId}>
                      <TableCell className="font-medium">
                        {formId.toUpperCase()}
                      </TableCell>
                      <TableCell>{version.edition}</TableCell>
                      <TableCell>
                        {latestEdition}
                        {hasUpdate && latestEdition !== version.edition && (
                          <Badge variant="destructive" className="ml-2">
                            New
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {version.needsFieldRemapping ? (
                          <Badge variant="destructive">
                            <AlertTriangle className="mr-1 h-3 w-3" />
                            Needs Remapping
                          </Badge>
                        ) : hasUpdate ? (
                          <Badge variant="outline" className="bg-yellow-100">
                            <AlertTriangle className="mr-1 h-3 w-3" />
                            Update Available
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-100">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Up to Date
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {version.expiresDate || (
                          <span className="text-muted-foreground">N/A</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(version.lastChecked).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(version.uscisUrl, '_blank')}
                          >
                            <FileText className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(version.pdfUrl, '_blank')}
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <strong>Check All Forms:</strong> Queries USCIS website to detect if any forms have new editions.
            </p>
            <p>
              <strong>Download All PDFs:</strong> Downloads all PDF templates from USCIS (use for initial setup).
            </p>
            <p>
              <strong>Download Updates:</strong> Downloads only forms that have new editions available.
            </p>
            <p className="text-destructive">
              <strong>⚠️ Important:</strong> When a form is updated, the PDF field names may change.
              Always verify field mappings before deploying updated forms to production.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
