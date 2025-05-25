import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
          <h1 className="text-6xl font-bold text-red-500">401</h1>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Unauthorized Access
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            You don't have permission to access this page.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <Link href="/" className="inline-block">
            <Button variant="primary" className="w-full">
              Go to Home
            </Button>
          </Link>
          
          <Link href="/login" className="inline-block">
            <Button variant="outline" className="w-full">
              Sign in with different account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 