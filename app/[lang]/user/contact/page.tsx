"use client";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export default function ContactPage() {
  const { toast } = useToast();
  return (
    <div className="space-y-6 p-10 pb-16 md:block">
      <h1>Contact Page</h1>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Scheduled: Catch up ",
            description: "Friday, February 10, 2023 at 5:57 PM",
            action: (
              <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            ),
          })
        }
      >
        Show Toast
      </Button>
    </div>
  );
}
