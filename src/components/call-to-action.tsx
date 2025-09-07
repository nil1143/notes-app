import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CallToAction() {
  return (
    <div>
      <section className="py-16 ">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
              🛠️ Build Your Mind Like a Developer
            </h2>
            <p className="mt-4">
              Fast, local-first, and built for code. Notes that work the way you
              think.
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/dashboard">
                  <span>Get Started</span>
                </Link>
              </Button>

            </div>
          </div>
        </div>
      </section>
      <section className="bg-background pb-16">
        <div className="group relative m-auto max-w-5xl px-6">
          <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
            <Link
              href="/"
              className="block text-sm duration-150 hover:opacity-75"
            >
              <span> Meet Our Customers</span>

              <ChevronRight className="ml-1 inline-block size-3" />
            </Link>
          </div>
          <div className="group-hover:blur-xs mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 sm:gap-x-16 sm:gap-y-14">
            <div className="flex">
              <Image
                className="mx-auto h-5 w-fit dark:invert"
                src="https://html.tailus.io/blocks/customers/nvidia.svg"
                alt="Nvidia Logo"
                height={20}
                width={80}
              />
            </div>

            <div className="flex">
              <Image
                className="mx-auto h-4 w-fit dark:invert"
                src="https://html.tailus.io/blocks/customers/column.svg"
                alt="Column Logo"
                height={16}
                width={64}
              />
            </div>
            <div className="flex">
              <Image
                className="mx-auto h-4 w-fit dark:invert"
                src="https://html.tailus.io/blocks/customers/github.svg"
                alt="GitHub Logo"
                height={16}
                width={64}
              />
            </div>
            <div className="flex">
              <Image
                className="mx-auto h-5 w-fit dark:invert"
                src="https://html.tailus.io/blocks/customers/nike.svg"
                alt="Nike Logo"
                height={20}
                width={80}
              />
            </div>
            <div className="flex">
              <Image
                className="mx-auto h-5 w-fit dark:invert"
                src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
                alt="Lemon Squeezy Logo"
                height={20}
                width={80}
              />
            </div>
            <div className="flex">
              <Image
                className="mx-auto h-4 w-fit dark:invert"
                src="https://html.tailus.io/blocks/customers/laravel.svg"
                alt="Laravel Logo"
                height={16}
                width={64}
              />
            </div>
            <div className="flex">
              <Image
                className="mx-auto h-7 w-fit dark:invert"
                src="https://html.tailus.io/blocks/customers/lilly.svg"
                alt="Lilly Logo"
                height={28}
                width={112}
              />
            </div>

            <div className="flex">
              <Image
                className="mx-auto h-6 w-fit dark:invert"
                src="https://html.tailus.io/blocks/customers/openai.svg"
                alt="OpenAI Logo"
                height={24}
                width={96}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
