import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/user-auth-form";

export default function LoginPage() {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="https://app.mem0.ai/images/light.svg"
          width={2480}
          height={843}
          alt="Authentication"
          className="block"
        />
      </div>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Image
              src="https://app.mem0.ai/images/light.svg"
              width={90}
              height={90}
              alt="Authentication"
              className="block mr-2"
            />
          </div>
          <div className="relative z-20 my-auto mx-32">
            <blockquote className="space-y-2">
              <p className="text-2xl font-medium">
                &ldquo;Mem0 is a self-improving memory layer for LLM applications, enabling personalized Al
experiences that save costs and delight users.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome!
              </h1>
              <p className="text-sm text-muted-foreground">
                Sign in to your account
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
