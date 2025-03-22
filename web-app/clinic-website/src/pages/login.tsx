import { GalleryVerticalEnd } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            SmartHealth
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {/* <LoginForm /> */}
            <p className="text-center text-gray-600">
              Please log in with Keycloak
            </p>
            <button className="w-full bg-blue-500 text-white p-2 rounded mt-4">
              Login with Keycloak
            </button>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/images/next.svg"
          alt="Image"
          className="flex h-full w-full items-center justify-center"
        />
      </div>
    </div>
  );
}
